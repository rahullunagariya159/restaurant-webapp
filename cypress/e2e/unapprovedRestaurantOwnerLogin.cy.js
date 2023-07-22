import { baseUrl, unApproveRestaurantOwnerAuth } from "../utils.cy";

describe("User Login as restaurant manager without restaturant", () => {
  it("User Login as restaurant manager without restaturant", () => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.contains("Restaurant Manager");
    cy.login(unApproveRestaurantOwnerAuth.email, unApproveRestaurantOwnerAuth.password);
    // cy.url().should("eq", `${baseUrl}add-restaurant`);
    cy.logout(`${baseUrl}login`);
  });
});
