import  {baseUrl,customerSupportAuth} from "../utils.cy";

describe('Customer Support Portal Login', () => {
  it('Validate user login flow with correct credentials', () => {
    cy.visit('/cs-login');
    cy.checkFoLoginPageLoaded()
    cy.contains('Customer Support Portal');
    cy.login(customerSupportAuth.email,customerSupportAuth.password);
    cy.url().should('eq', baseUrl);
    cy.logout(`${baseUrl}cs-login`);
  })
})
