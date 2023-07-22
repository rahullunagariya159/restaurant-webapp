import { baseUrl, restaurantOwnerAuth } from "../utils.cy";

describe("Restaurant Manager Login", () => {
  it("passes", () => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.contains("Restaurant Manager");
    cy.login(restaurantOwnerAuth.email, restaurantOwnerAuth.password);
    cy.url().should("eq", baseUrl);
    cy.logout(`${baseUrl}login`);
  });
});
