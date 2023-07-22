import { bulkImages, baseUrl, restaurantOwnerAuth, DOM_TIMEOUT } from "../utils.cy";

describe("Restaurant manager upload bulk images", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.login(restaurantOwnerAuth.email, restaurantOwnerAuth.password);
    cy.visit("/bulk-uploads");
    cy.contains("+ Upload images");
  });

  afterEach(() => {
    cy.wait(5000);
    cy.logout(`${baseUrl}login`);
  });

  it("Restaurant manager upload bulk images", () => {
    cy.get("button").contains("+ Upload images").click({ force: true });
    cy.uploadImage("uploadBulkImages", bulkImages);
    cy.wait(2000);
    cy.get("#saveBulkImages").click({ force: true });

    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Image uploaded successfully');
  });

  it("Restaurant manager delete uploaded image", () => {
    cy.get("#uploadedImgList li").first().get("#btnDeleteUploadedImg").click();
    cy.contains("Are you sure?");
    cy.get("button").contains(`Sure`).click();
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Image deleted successfully');
  });
});
