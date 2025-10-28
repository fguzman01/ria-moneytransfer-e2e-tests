 // cypress/pages/RiaHomePage.js
import { safeClick, fillInput , waitForElement} from '../utils/WebUtils'
import { WebUtils } from '../utils/WebUtils';

class RiaHomePage  {

  
  constructor() {
    
    this.url = '/'
  // Locators
    this.sendingAmountInput = '#sending-amount'
    this.receivingAmountInput = '#receiving-amount'
    this.sendToDropdown = ".calc-heading div[role='button'].dropdown-selected"
    this.primaryButton = 'a[role="button"][name="primary"]'
    this.countrySearchInput = '#destinationCountry'
    this.receiveCurrencyDropdown = ".currency-to div[role='button'].dropdown-selected"
    this.registerButton = 'a[role="button"][name="primary"]:contains("Register")'
  }
  
  
  
  /**
   * Waits for the destination currency to be the expected one
   * @param {string} code - Expected currency code (e.g., "HTG")
   */
  waitForDestinationCurrency(code) {
  cy.log(`[VALIDATE] Waiting for destination currency: ${code}`);
    WebUtils.waitForElement(this.receiveCurrencyDropdown);
    cy.get(this.receiveCurrencyDropdown, { timeout: 15000 })
      .should('be.visible')
      .should('have.text', code)
  .then(() => cy.log(`[VALIDATE ✅] Destination currency displayed: ${code}`));
  }
  

  validateHomeLoaded() {
    console.log('[VALIDATE] Validating Ria Home load...')
    WebUtils.waitForElement(this.sendToDropdown)
    WebUtils.waitForElement(this.sendingAmountInput)
    WebUtils.waitForElement(this.receivingAmountInput)
    WebUtils.waitForElement(this.primaryButton)
  console.log('[VALIDATE] Ria Home loaded successfully.')
  }

  /**
   * Selects a country in the country dropdown.
   * @param {string} country - Visible name of the country to select
   */
  selectCountry(country) {
  cy.log(`[ACTION] Selecting destination country: ${country}`);
    WebUtils.waitForElement(this.sendToDropdown)
    WebUtils.safeClick(this.sendToDropdown)
    WebUtils.waitForElement(this.countrySearchInput)
    WebUtils.fillInput(this.countrySearchInput, country, true)
    const countryOption = `span.complete-text:contains('${country}')`
    WebUtils.waitForElement(countryOption)
    WebUtils.safeClick(countryOption)
  console.log(`[ACTION ✅] Country selected: ${country}`)
  }

  /**
   * Enters the amount in the sending field
   * @param {string|number} amount - Amount to enter
   */
  enterAmount(amount) {
  cy.log(`[ACTION] Entering amount: ${amount}`);
    WebUtils.waitForElement(this.sendingAmountInput);
    WebUtils.fillInput(this.sendingAmountInput, amount, true);
  cy.log('[ACTION ✅] Amount entered successfully');
  }


  /**
   * Validates the message shown when the amount field is empty
   */
  validateEmptyAmountMessage() {
    WebUtils.waitForElement(this.sendingAmountInput);
    cy.get(this.sendingAmountInput).clear();
    cy.contains('Quote is based on selected options with current fees and rates.', { timeout: 10000 })
      .should('be.visible')
  .then(() => cy.log('[VALIDATE ✅] Empty amount message displayed correctly.'));
  }


  /**
   * Validates that the conversion updates correctly when changing the amount
   * @param {string|number} newAmount - New amount to enter
   */
  validateConversionUpdates(newAmount) {
  cy.log('[VALIDATE] Checking conversion update...');

  // Capturar el valor actual de "Recipient receives"
  cy.get(this.receivingAmountInput)
    .invoke('val')
    .then((initialValue) => {
  cy.log(`[VALIDATE] Initial value: ${initialValue}`);

      // Ingresar el nuevo monto
      WebUtils.fillInput(this.sendingAmountInput, newAmount, true);

      // Esperar que el valor cambie
      cy.get(this.receivingAmountInput, { timeout: 10000 })
        .should('not.have.value', initialValue)
        .then(($input) => {
          cy.log(`[VALIDATE ✅] Conversion updated successfully: ${$input.val()}`);
        });
    });
}

  /**
  * Clicks the Register button
  */
  clickRegisterButton() {
  cy.log('[ACTION] Trying to click the Register button...');
    WebUtils.waitForElement(this.registerButton);
    WebUtils.safeClick(this.registerButton);
  cy.log('[ACTION ✅] Click on Register button performed successfully.');
  }

}


export default RiaHomePage