// import {
//   restaurantLogo,
//   baseUrl,
//   unApproveRestaurantOwnerAuth,
//   customerSupportAuth,
//   DOM_TIMEOUT,
//   checkFoLoginPageLoaded
// } from "../utils.cy";
//
// describe("Restaurant manager add restaurant and approved restaurant by customer support", () => {
//   let restaurantId = "";
//   before(() => {
//     cy.visit("/login");
//     cy.checkFoLoginPageLoaded()
//     cy.contains("Restaurant Manager");
//     cy.login(unApproveRestaurantOwnerAuth.email, unApproveRestaurantOwnerAuth.password);
//     cy.url().should("eq", `${baseUrl}add-restaurant`);
//   });
//
//   after(() => {
//     cy.wait(5000);
//     cy.logout(`${baseUrl}cs-login`);
//   });
//
//
//   it("Restaurant manager add new restaurant", () => {
//     cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Add your restaurant')
//
//     cy.get('input[name="resturantName"]').type("big pizza new test test test pizza test");
//     cy.get('input[name="resturantAddress"]').type("us");
//     cy.get('textarea[name="description"]').type("pizza");
//     cy.get('input[name="city"]').type("ohio");
//     cy.get('input[name="zip"]').type("41024");
//
//     cy.uploadImage("addRestaurantImg", restaurantLogo);
//
//     cy.addRestaurantOrderOptions("#specifyCuisine", "Done");
//     cy.addRestaurantOrderOptions("#orderingOption", "Done");
//     cy.addRestaurantOrderOptions("#specifyMenu", "Done");
//
//     cy.get("#addRestaurant").click({ force: true });
//
//     cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Your Restaurant Is Pending Review')
//
//     cy.contains("Your Restaurant Is Pending Review");
//     cy.get("#btnCancelRequest")
//       .invoke("data", "id")
//       .then((dataId) => {
//         cy.log("dataId : ", dataId);
//         restaurantId = dataId;
//       });
//
//     cy.wait(2000);
//     cy.logout(`${baseUrl}login`);
//   });
//
//   it("Approve restaurant by customer support", () => {
//     cy.visit("/cs-login");
//     cy.checkFoLoginPageLoaded()
//     cy.contains("Customer Support Portal");
//
//     cy.login(customerSupportAuth.email, customerSupportAuth.password);
//     cy.url().should("eq", `${baseUrl}`);
//
//     cy.get('input[name="restaurantId"]').type(restaurantId);
//     cy.get("#btnValidateRestaurantCs").click();
//
//     cy.contains("Approved Restaurant");
//     cy.get("#btnApprovedRestaurant").click();
//     cy.contains("Verify Restaurant Details");
//     cy.get("#btnCsApproved").click();
//
//     cy.get('button', { timeout: DOM_TIMEOUT }).should('contain', 'ok')
//
//     cy.get("#btnSuccessApprovedAlert").click();
//
//     cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Restaurant approved successfully')
//   });
// });
//
