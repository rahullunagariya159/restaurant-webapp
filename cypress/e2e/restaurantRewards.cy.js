import { singleImg, baseUrl, restaurantOwnerAuth, DOM_TIMEOUT, makeid} from "../utils.cy";

describe("Restaurant manager add, edit and delete reward", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.checkFoLoginPageLoaded()
    cy.login(restaurantOwnerAuth.email, restaurantOwnerAuth.password);
    cy.visit("/rewards");
    cy.get('h3', { timeout: DOM_TIMEOUT }).should('contain', 'Rewards')
  });

  afterEach(() => {
    cy.wait(5000);
    cy.logout(`${baseUrl}login`);
  });

  var i = 0;
  for (i = 0; i < 2; i++) {
  it("Restaurant manager add new restaurant reward", () => {
    cy.get("button").contains("Add Rewards").click({ force: true });
      const id = makeid(5);
      cy.get('input[name="rewardTitle"]').type("welcome fooddiscoveryapp " + id);
      cy.get("#availableToResFollower").click();
      cy.get("#numRewardsAutoComplete").click();
      cy.get('#numRewardsAutoComplete-option-0').click();
      cy.get("#redeemRewardAutoComplete").click();
      cy.get("#redeemRewardAutoComplete-option-1").click();
      cy.get('#rewardInputDialogTitle', { timeout: DOM_TIMEOUT }).should('contain', 'How Should users redeemed this reward?');
      cy.get('input[name="rewardRadiusInput"]').type(12321);
      cy.get('#btnAddRewardCode').click();

      cy.uploadImage("uploadRewardImg", singleImg);
      cy.wait(2000);

      cy.get("#btnAddEditReward").click({ force: true });
      cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Reward created successfully')
  });
}

  it("Restaurant manager edit restaurant reward", () => {
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


  it("Restaurant manager delete restaurant reward", () => {
    cy.deleteRestaurantItems("#rewardsList","#btnDeleteReward","Sure")
    cy.wait(1000);
    cy.get('div.Toastify__toast-body', { timeout: DOM_TIMEOUT }).should('contain', 'Rewards has been deleted successfully')
  });
});
