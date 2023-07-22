import  {baseUrl,photographerAuth} from "../utils.cy";

describe('Photographer Portal Login', () => {
  it('Validate user login flow with correct credentials', () => {
    cy.visit('/photographer-login');
    cy.checkFoLoginPageLoaded()
    cy.contains('Photographer Portal');
    cy.login(photographerAuth.email,photographerAuth.password);
    cy.url().should('eq', baseUrl);
    cy.logout(`${baseUrl}photographer-login`);
  })
})
