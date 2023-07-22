// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import * as utils from '../utils.cy'
import {checkFoLoginPageLoaded} from "../utils.cy";

Cypress.Commands.add('login', (userName, password, verifyPageLoaded = true) => {
  cy.get('input[name="email"]').type(userName)
  cy.get('input[name="password"]').type(password)
  cy.get('button[name="submit"]').click({ force: true })

  if (verifyPageLoaded) {
    utils.checkForPageLoaded()
  }
})

Cypress.Commands.add('checkFoLoginPageLoaded', () => {
  utils.checkFoLoginPageLoaded()
})

Cypress.Commands.add('logout', (url) => {
  cy.log("calll ")
  cy.get('#right-menu-appbar', { timeout: utils.DOM_TIMEOUT }).click({ force: true })
  cy.get('#logout').click({ force: true })
  cy.url().should('eq', url || 'http://localhost:3000/login')
})

Cypress.Commands.add('addRestaurantOrderOptions', (inputId, buttonText) => {
  cy.get(inputId).click({ force: true });
  cy.get(`${inputId}Checkbox`).first().check(); // Check first checkbox element
  cy.get('button').contains(buttonText).click({ force: true });
})

Cypress.Commands.add('selectRestaurantOrderOptions', (selectId) => {
  cy.get(selectId).click();

  cy.get(`${selectId} .chipInputSelect__menu-list`).then(($body) =>{
      if($body.find(".chipInputSelect__menu-notice--no-options").length)
        {
            return false;
        }
        cy.get(`${selectId} .chipInputSelect__menu .chipInputSelect__menu-list .chipInputSelect__option`).first().click();
      })
})

Cypress.Commands.add('deleteRestaurantItems', (listId, deleteBtnId, buttonText) => {
  cy.get(`${listId} tbody`).first().get(`${deleteBtnId}`).click()
  cy.contains('Are you sure?');
  cy.get('button').contains(`${buttonText}`).click();
})

Cypress.Commands.add('uploadImage', (name, image) => {
  cy.get(`input[name=${name}]`).selectFile(image,{ action: "select",force: true });
})

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn(url, {
    ...options,
    timeout: utils.PAGE_LOADING_TIMEOUT
  });
});
