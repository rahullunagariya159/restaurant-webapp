// DOM visibility max timeout
export const DOM_TIMEOUT = 4 * 60 * 1000;
export const PAGE_LOADING_TIMEOUT = 10 * 60 * 1000;
export const DOM_NOT_TIMEOUT = 2 * 60 * 1000;

export const checkForPageLoaded = (timeout = DOM_TIMEOUT) => {
  cy.get("#right-menu-appbar", { timeout }); // Waiting till page is loaded
};

export const checkFoLoginPageLoaded = (timeout = PAGE_LOADING_TIMEOUT) => {
  cy.get("#loginSubmit", { timeout }); // Waiting till page is loaded
};

export const bulkImages = [
  "cypress/fixtures/images/cheez-pizza.jpeg",
  "cypress/fixtures/images/nonveg-burger.jpeg",
  "cypress/fixtures/images/veg-burger.jpeg",
];

export const singleImg = "cypress/fixtures/images/cheez-pizza.jpeg";
export const restaurantLogo = "cypress/fixtures/images/restaurant-logo.png";
export const portraitVideo = "cypress/fixtures/videos/story-video.mp4";
export const restaurantId = "4c5f8cce-6fed-4c6e-ab89-447781cbcac6";

export const baseUrl = "http://localhost:3000/";

export const restaurantOwnerAuth = {
  email: "cirax59255@mahazai.com",
  password: "cirax59255@mahazai.com",
};

export const unApproveRestaurantOwnerAuth = {
  email: "xetewow858@mahazai.com",
  password: "xetewow858@mahazai.com",
};

export const customerSupportAuth = {
  email: "cs@fooddiscoveryapp.com",
  password: "cs@fooddiscoveryapp.com",
};

export const photographerAuth = {
  email: "pic2@fooddiscoveryapp.com",
  password: "pic2@fooddiscoveryapp.com",
};


export const  makeid = (length) => {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
  charactersLength));
  }
 return result;
}
