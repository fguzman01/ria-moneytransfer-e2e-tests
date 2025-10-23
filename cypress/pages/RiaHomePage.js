 // cypress/pages/RiaHomePage.js
import { safeClick, fillInput , waitForElement} from '../utils/WebUtils'
import { WebUtils } from '../utils/WebUtils';

class RiaHomePage  {
 
 
  constructor() {
    
    this.url = '/'
    // Locators reales del Ria Calculator
    this.sendingAmountInput = '#sending-amount'
    this.receivingAmountInput = '#receiving-amount'
    // Dropdown de país "Send to ..."
    this.sendToDropdown = ".calc-heading div[role='button'].dropdown-selected"
    this.primaryButton = 'a[role="button"][name="primary"]'
    this.countrySearchInput = '#destinationCountry'
    // Dropdown de moneda destino (receiving currency)
    this.receiveCurrencyDropdown = ".currency-to div[role='button'].dropdown-selected"
  }
  
  
  
  /**
   * Espera que la moneda destino sea la esperada
   * @param {string} code - Código de moneda esperado (ej: "HTG")
   */
  waitForDestinationCurrency(code) {
    cy.log(`[VALIDATE] Esperando moneda destino: ${code}`);
    WebUtils.waitForElement(this.receiveCurrencyDropdown);
    cy.get(this.receiveCurrencyDropdown, { timeout: 15000 })
      .should('be.visible')
      .should('have.text', code)
      .then(() => cy.log(`[VALIDATE ✅] Moneda destino mostrada: ${code}`));
  }
  

  validateHomeLoaded() {
    console.log('[VALIDATE] Validando carga de la Home de Ria...')
    WebUtils.waitForElement(this.sendToDropdown)
    WebUtils.waitForElement(this.sendingAmountInput)
    WebUtils.waitForElement(this.receivingAmountInput)
    WebUtils.waitForElement(this.primaryButton)
    console.log('[VALIDATE ✅] Home de Ria cargada correctamente.')
  }

  /**
   * Selecciona un país en el dropdown de país.
   * @param {string} country - Nombre visible del país a seleccionar
   */
  selectCountry(country) {
    cy.log(`[ACTION] Seleccionando país destino: ${country}`);
    WebUtils.waitForElement(this.sendToDropdown)
    WebUtils.safeClick(this.sendToDropdown)
    WebUtils.waitForElement(this.countrySearchInput)
    WebUtils.fillInput(this.countrySearchInput, country, true)
    const countryOption = `span.complete-text:contains('${country}')`
    WebUtils.waitForElement(countryOption)
    WebUtils.safeClick(countryOption)
    console.log(`[ACTION ✅] País seleccionado: ${country}`)
  }

   /**
   * Ingresa el monto en el campo de envío
   * @param {string|number} amount - Monto a ingresar
   */
  enterAmount(amount) {
    cy.log(`[ACTION] Ingresando monto: ${amount}`);
    WebUtils.waitForElement(this.sendingAmountInput);
    WebUtils.fillInput(this.sendingAmountInput, amount, true);
    cy.log('[ACTION ✅] Monto ingresado correctamente');
  }


  /**
   * Valida el mensaje mostrado cuando el campo de monto está vacío
   */
  validateEmptyAmountMessage() {
    WebUtils.waitForElement(this.sendingAmountInput);
    cy.get(this.sendingAmountInput).clear();
    cy.contains('Quote is based on selected options with current fees and rates.', { timeout: 10000 })
      .should('be.visible')
      .then(() => cy.log('[VALIDATE ✅] Mensaje de monto vacío mostrado correctamente.'));
  }


  /**
   * Valida que la conversión se actualiza correctamente al cambiar el monto
   * @param {string|number} newAmount - Nuevo monto a ingresar
   */
  validateConversionUpdates(newAmount) {
  cy.log('[VALIDATE] Verificando actualización de conversión...');

  // Capturar el valor actual de "Recipient receives"
  cy.get(this.receivingAmountInput)
    .invoke('val')
    .then((initialValue) => {
      cy.log(`[VALIDATE] Valor inicial: ${initialValue}`);

      // Ingresar el nuevo monto
      WebUtils.fillInput(this.sendingAmountInput, newAmount, true);

      // Esperar que el valor cambie
      cy.get(this.receivingAmountInput, { timeout: 10000 })
        .should('not.have.value', initialValue)
        .then(($input) => {
          cy.log(`[VALIDATE ✅] Conversión actualizada correctamente: ${$input.val()}`);
        });
    });
}

}


export default RiaHomePage