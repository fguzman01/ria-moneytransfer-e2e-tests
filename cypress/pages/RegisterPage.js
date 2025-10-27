import { WebUtils } from '../utils/WebUtils';
import { envConfig } from '../support/envConfig'; 

 class RegisterPage {
  constructor() {
    cy.log('[PAGE] Initializing RegisterPage...');
    // Selectors in RegisterPage
    this.countryNameSpan = "span.oen-ui-input-country-name-after-icon";
  }

  /**
   * Validates that the country selection page shows the expected country
   * @param {string} expectedCountry - Expected country (default 'Chile')
   */
  validateCountrySelectionPage(expectedCountry = 'Chile') {
  cy.log('[VALIDATE] Checking country selection page...');

  
  cy.origin('https://secure.riamoneytransfer.com', () => {
    const selector = 'span.oen-ui-input-country-name-after-icon';
    cy.log('[VALIDATE] Inside secure domain...');
    
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const countryText = text.trim();
        if (countryText === 'Chile') {
          cy.log(`[VALIDATE] Country displayed correctly: ${countryText}`);
        } else {
          throw new Error(
            `[VALIDATE] Incorrect country. Expected: ${expectedCountry}, Got: ${countryText}`
          );
        }
      });
  });
}
 
}
export default RegisterPage;
