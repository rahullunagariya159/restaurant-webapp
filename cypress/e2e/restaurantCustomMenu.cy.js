import { baseUrl, restaurantOwnerAuth, DOM_TIMEOUT,makeid } from "../utils.cy";

describe("Restaurant manager add, edit and delete custom", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.login(restaurantOwnerAuth.email, restaurantOwnerAuth.password);
    cy.visit("/custom-menu");
    cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Custom Menu')
  });

  afterEach(() => {
    cy.wait(5000);
    cy.logout(`${baseUrl}login`);
  });

  it("Restaurant manager add custom menu", () => {
    cy.get("button").contains("Add Custom menu").click({ force: true });
    const name = makeid(5)
    cy.get('input[name="cMenuName"]').type("lunch " + name);
    cy.get("#btnCMNext").click();
    // cy.get(".cmImgItem").first().get(`#addCMImage0`).click();
    cy.get("#btnCMSave").click({ force: true });
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Menu has been created')
  });

  it("Restaurant manager edit custom menu", () => {
    cy.get("#customMenuList tbody").first().get("#btnEditCustomMenu").click();
    cy.wait(2000);
    const name = makeid(5);

    cy.get('input[name="cMenuName"]').focus().clear();
    cy.get('input[name="cMenuName"]').type( "dinner " + name);

    cy.get("#btnCMNext").click();
    // cy.get('.cmImgItem').first().get(`#addCMImage0`).click();
    // cy.get('.cmImgItem').first().get(`#addCMImage1`).click();

    cy.get("#btnCMSave").click({ force: true });
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Menu has been edited')
  });

  it("Restaurant manager delete custom menu", () => {
    cy.deleteRestaurantItems("#customMenuList", "#btnDeleteCustomMenu", "Sure");
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Menu has been deleted successfully')
  });
});
