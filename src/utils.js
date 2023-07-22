import uuid from "uuid-random";
import Resizer from "react-image-file-resizer";
import {Storage} from "aws-amplify";
import aws_exports from "./aws-exports";
import {PHOTOGRAPHER_ROLE, RESTAURANT_OWNER_ROLE, CUSTOMER_SERVICE_ROLE} from "./consts";
import slugify from "slugify";

export const getFileName = (name='') => {
	return name.replace(/\__[^/.]+$/, "").replace(/_/g, ' ')
}


export const getTagNameFromStatus = (name='') => {
	switch(name.toUpperCase()) {
		case 'APPROVED':
		case 'ENABLED':
			// code block
			return 'Active';
		case 'DISABLE':
			// code block
			return 'Not-Active';
		case 'PENDING':
			return 'Pending'
		default:
		// code block
	}
}

export const getStatusNameFromTag = (name='') => {
	switch(name.toUpperCase()) {
		case 'ACTIVE':
			// code block
			return 'APPROVED';
		case 'NOT-ACTIVE':
			// code block
			return 'DISABLE';
		case 'PENDING':
			return 'PENDING'
		default:
		// code block
	}
}

export const sortByName = (array=[], key='key') => {
	return array.slice().sort(function(a, b) {
		var x = a[key].toLowerCase();
		var y = b[key].toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

export const sortBy = (array=[]) => {
	return array.slice().sort(function(a, b) {
		var x = a.toLowerCase();
		var y = b.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

export const hasPhotographerRole = (userGroup=[]) => {
	return  userGroup && userGroup.indexOf(PHOTOGRAPHER_ROLE) > -1;
}
export const hasCustomerSupportRole = (userGroup=[]) => {
	return  userGroup && userGroup.indexOf(CUSTOMER_SERVICE_ROLE) > -1;
}
export const hasRestaurantOwnerRole = (userGroup=[]) => {
	return  userGroup && userGroup.indexOf(RESTAURANT_OWNER_ROLE) > -1;
}

export const uploadPics = async (pictures) => {
	const promises = [];

	if (pictures.length > 0) {
		pictures.forEach((pic) => {
			const filename = `${uuid()}${Date.now()}`;
			promises.push(
				new Promise(async function (res) {
					await Resizer.imageFileResizer(
						pic,
						1500,
						1500,
						'JPEG',
						100,
						0,
						async (uri) => {
							Storage.put(filename, uri, {
								contentType: pic.type,
							})
								.then((result) => {
									//return result;
									res(result);
								})
								.catch((err) => console.log(err));
						},
						'blob'
					);
				})
			);
		});
	}

	let files = [];

	let uploads = await Promise.all(promises);
	if (uploads.length > 0) {
		uploads.forEach((u) => {
			files.push({
				key: u.key,
				bucket: aws_exports.aws_user_files_s3_bucket,
				region: aws_exports.aws_project_region,
			});
		});
	}
	return files;
}

const fileNameSlugify = (name) => {
  return slugify(name.replace(/\.[^/.]+$/, ''), '_');
};

export const uploadVideo = async (pictures) => {
  try {
      let videoTitle = fileNameSlugify(pictures[0].name || '');
      const promises = [];
      if (pictures.length > 0) {
        pictures.forEach((pic) => {
          const filename = `${fileNameSlugify(
            pic.name || '',
          )}__${uuid()}${Date.now()}`;
          promises.push(
            Storage.put(filename, pic, {
              contentType: pic.type,
            }),
          );
        });
      }

      let files = [];

      let uploads = await Promise.all(promises);

      if (uploads.length > 0) {
        uploads.forEach((u) => {
          files.push({
            key: u.key,
            bucket: aws_exports.aws_user_files_s3_bucket,
            region: aws_exports.aws_project_region,
          });
        });
      }

      return files;

    } catch (error) {
          console.log("upload video error",error)
    }
};

const slugOptions = {
  replacement: '-',  // replace spaces with replacement character, defaults to `-`
  remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
  lower: true,      // convert to lower case, defaults to `false`
  strict: true,     // strip special characters except replacement, defaults to `false`
  // locale: 'vi',       // language code of the locale to use
  trim: false         // trim leading and trailing replacement chars, defaults to `true`
}

export const slugifyString = (string='') => {
  return slugify(string, slugOptions);
}

export const unProtectedRoute = [
	'/login',
	'/register',
	'/verify',
	'/photographer-login',
	'/photographer-register',
	'/cs-login',
	'/cs-register',
]
export const customSupportsRoute = [
	'/cs/restaurant',
	'/',
]
