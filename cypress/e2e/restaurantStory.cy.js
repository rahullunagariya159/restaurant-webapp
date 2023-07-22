import { baseUrl, restaurantOwnerAuth, DOM_TIMEOUT,portraitVideo,makeid } from "../utils.cy";

describe("Restaurant manager add story", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.login(restaurantOwnerAuth.email, restaurantOwnerAuth.password);
    cy.visit("/story");
    cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Story');
  });

  afterEach(() => {
    cy.wait(5000);
    cy.logout(`${baseUrl}login`);
  });

  it("Restaurant manager add story", () => {
    const id = makeid(5);
    cy.get("button").contains("Add Story").click({ force: true });

    cy.get('input[name="title"]').type(`Miss Lizzy's Veggie Pie ${id}`);
    cy.get('textarea[name="description"]').type("Pizza");

    cy.uploadImage("uploadStoryImg", portraitVideo);

    // cy.get('#btnChooseStoryImg').click();
    // cy.get('.storyImgItem').first().get(`#addStoryImage0`).click();
    cy.wait(1000);
    // cy.get('#addSelectedImg').click();

    cy.get("#btnSaveStory").click({ force: true });
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'New story has been added');
  });

  it("Restaurant manager edit story", () => {
    const id = makeid(5);
    cy.get("#storiesList tbody").first().get("#btnEditStory").click();

    cy.get('input[name="title"]').focus().clear();
    cy.get('input[name="title"]').type(`Miss Lizzy's Veggie Pie ${id}`);
    cy.get('textarea[name="description"]').focus().clear();
    cy.get('textarea[name="description"]').type("Pizza");
    cy.get('#btnCancelFile').click();
    cy.wait(500);
    cy.uploadImage("uploadStoryImg", portraitVideo);
    cy.get("#btnSaveStory").click({ force: true });

    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Story has been edited successfully');
  });

  it("Restaurant manager delete story", () => {
    cy.deleteRestaurantItems("#storiesList", "#btnDeleteStory", "Sure");
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Story has been deleted successfully');
  });
});
