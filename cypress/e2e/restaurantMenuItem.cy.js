import { bulkImages, baseUrl, restaurantOwnerAuth, DOM_TIMEOUT, makeid} from "../utils.cy";

describe("Restaurant manager add, edit and delete restaurant menu item", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.login(restaurantOwnerAuth.email, restaurantOwnerAuth.password);
    cy.visit("/items");
    cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Menu Items')
  });

  afterEach(() => {
    cy.wait(5000);
    cy.logout(`${baseUrl}login`);
  });

  var i = 0;
  for (i = 0; i < 3 ; i++) {
  it("Restaurant manager add new restaurant menu item", () => {
    cy.get("button").contains("Add Item").click({ force: true });
      const id = makeid(5);
      cy.get('input[name="title"]').type("Miss Lizzy's Veggie Pie cheese " + id);
      cy.get('textarea[name="description"]').type("Pizza with extra cheese " + id);
      cy.get('input[name="price"]').type(150);

      cy.uploadImage("uploadMenuItemImg", bulkImages);
      cy.selectRestaurantOrderOptions("#menuSpecifyCuisine");
      cy.selectRestaurantOrderOptions("#menuSpecifyDiets");
      cy.addRestaurantOrderOptions("#menuOrderingOption", "Done");
      cy.selectRestaurantOrderOptions("#menuSpecifyMenu");

      cy.get("#menu-card-mood-select").click();
      cy.get("li").contains("Feeling Hangry").click();

      cy.get("#saveMenuItem").click({ force: true });
      cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'New item has been created successfully')
  });
}
  it("Restaurant manager edit restaurant menu item", () => {
    cy.get("#listMenuItems tbody").first().get("#btnEditMenuItem").click();
    cy.wait(2000);
    const id = makeid(5);

    cy.get('input[name="title"]').focus().clear();
    cy.get('input[name="title"]').type("Margherita " + id);
    cy.get('textarea[name="description"]').focus().clear();
    cy.get('textarea[name="description"]').type("Classic delight with 100% real mozzarella cheese " + id);
    cy.get('input[name="price"]').focus().clear();
    cy.get('input[name="price"]').type(150);

    cy.uploadImage("formImageUploader", bulkImages);

    // cy.get('#btnChooseMenuItemImg').click();
    // cy.get('.menuItemImg').first().get(`#addMenuItemImg0`).click();
    // cy.get('.menuItemImg').first().get(`#addMenuItemImg1`).click();
    // cy.get('.menuItemImg').first().get(`#addMenuItemImg2`).click();
    // cy.get('#btnSelMenuItem').click();

    // cy.addRestaurantOrderOptions("#specifyCuisine", "Done");
    // cy.addRestaurantOrderOptions("#specifyDiets", "Done");
    // cy.addRestaurantOrderOptions("#orderingOption", "Done");
    // cy.addRestaurantOrderOptions("#specifyMenu", "Done");

    cy.get("#card-mood-select").click();
    cy.get("li").contains("Give Me Spicy").click();

    cy.get("#btnAddEdit").click({ force: true });
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Item edited successfully')
  });


  // it("Restaurant manager delete restaurant pending menu item", () => {
  //   cy.visit("/pending-items");
  //   cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Pending Menu Items')
  //   cy.deleteRestaurantItems("#pendingMenuItemsList", "#btnDeletePendingMenuItem", "Sure");
  //   cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Menu items has been deleted successfully');
  // });

  it("Restaurant manager delete restaurant menu item", () => {
    // cy.deleteRestaurantItems("#listMenuItems","#btnDeleteMenuItem","Sure")
    cy.wait(1000);
    // cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Item has been deleted successfully')
  });
});
