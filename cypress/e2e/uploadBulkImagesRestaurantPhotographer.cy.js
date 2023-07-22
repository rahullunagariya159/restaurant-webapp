import { bulkImages, baseUrl, restaurantId, photographerAuth, DOM_TIMEOUT } from "../utils.cy";

describe("Photographer upload restaurant item images", () => {
  before(() => {
    cy.visit("/photographer-login");
    cy.checkFoLoginPageLoaded()
    cy.contains("Photographer Portal");
    cy.login(photographerAuth.email, photographerAuth.password);
    cy.url().should("eq", `${baseUrl}`);
  });

  it("Photographer upload restaurant item images", () => {
    cy.get('input[name="restaurantId"]').type(restaurantId);
    cy.get("#phBtnValidateRestaurant").click();

    cy.contains("+ Upload images");
    cy.get("#btnUploadImages").click();
    cy.uploadImage("uploadBulkImages", bulkImages);
    cy.wait(2000);
    cy.get("#saveBulkImages").click();

    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Image uploaded successfully')
    cy.wait(2000);
    cy.logout(`${baseUrl}photographer-login`);
  });
});
