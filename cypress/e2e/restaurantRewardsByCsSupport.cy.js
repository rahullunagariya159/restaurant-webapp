import { singleImg, baseUrl, customerSupportAuth, DOM_TIMEOUT, makeid} from "../utils.cy";

describe("Customer support add, edit and delete reward", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.login(customerSupportAuth.email, customerSupportAuth.password);
    cy.visit("/cs/approved-restaurant");
    cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Approved Restaurant')
  });

  afterEach(() => {
    cy.wait(5000);
    cy.logout(`${baseUrl}cs-login`);
  });

  var i = 0;
  for (i = 0; i < 2; i++) {
  it("Customer support add new restaurant reward", () => {
    cy.get("#approvedRestaurantList tbody").first().get("#btnCsAddReward").click();
    const id = makeid(5);
      cy.get('input[name="rewardTitle"]').type("welcome fooddiscoveryapp " + id);
      cy.get("#availableToResFollower").click();
      cy.get("#numRewardsAutoComplete").click();
      cy.get('#numRewardsAutoComplete-option-0').click();
      cy.get("#redeemRewardAutoComplete").click();
      cy.get("#redeemRewardAutoComplete-option-1").click();
      cy.get('#rewardInputDialogTitle', { timeout: DOM_TIMEOUT }).should('contain', 'How Should users redeemed this reward?');
      cy.get('input[name="rewardRadiusInput"]').type(5552);
      cy.get('#btnAddRewardCode').click();

      cy.uploadImage("uploadRewardImg", singleImg);
      cy.wait(2000);

      cy.get("#btnAddEditReward").click({ force: true });
      cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Reward created successfully')
  });
}

  it("Customer support edit restaurant reward", () => {
      cy.get("#approvedRestaurantList tbody").first().get("#btnCsViewReward").click();
      cy.wait(2000);
      cy.get("#rewardsList tbody").first().get("#btnEditReward").click();
      cy.wait(2000);
      const id = makeid(5);
      cy.get('input[name="rewardTitle"]').focus().clear();
      cy.get('input[name="rewardTitle"]').type("welcome fooddiscoveryapp back " + id);

      cy.get("#numRewardsAutoComplete").focus().clear();
      cy.get("#numRewardsAutoComplete").click();
      cy.get('#numRewardsAutoComplete-option-0').click();

      cy.get("#cancelRedeemReward").click();
      cy.get("#redeemRewardAutoComplete").click();
      cy.get("#redeemRewardAutoComplete-option-1").click();
      cy.get('#rewardInputDialogTitle', { timeout: DOM_TIMEOUT }).should('contain', 'How Should users redeemed this reward?');
      cy.get('input[name="rewardRadiusInput"]').focus().clear();
      cy.get('input[name="rewardRadiusInput"]').type(1110);
      cy.get('#btnAddRewardCode').click();


      cy.get("#btnAddEditReward").click({ force: true });
      cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Reward edit successfully')
  });


  it("Customer support delete restaurant reward", () => {
    cy.get("#approvedRestaurantList tbody").first().get("#btnCsViewReward").click();
    cy.wait(1000);
    cy.deleteRestaurantItems("#rewardsList","#btnDeleteReward","Sure")
    cy.wait(1000);
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Rewards has been deleted successfully')
  });
});
