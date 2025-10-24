import { WebUtils } from '../utils/WebUtils';
import { envConfig } from '../support/envConfig'; 

 class RegisterPage {
  constructor() {
    cy.log('[PAGE] Inicializando RegisterPage...');
    // Selecctores en registerPage
    this.countryNameSpan = "span.oen-ui-input-country-name-after-icon";
  }

  /**
   * Valida que la página de selección de país muestre el país esperado
   * @param {string} expectedCountry - País esperado (por defecto 'Chile')
   */
  validateCountrySelectionPage(expectedCountry = 'Chile') {
  cy.log('[VALIDATE] Verificando página de selección de país...');

  
  cy.origin('https://secure.riamoneytransfer.com', () => {
    const selector = 'span.oen-ui-input-country-name-after-icon';
    cy.log('[VALIDATE] Dentro del dominio seguro...');
    
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const countryText = text.trim();
        if (countryText === 'Chile') {
          cy.log(`[VALIDATE ✅] País mostrado correctamente: ${countryText}`);
        } else {
          throw new Error(
            `[VALIDATE ❌] País incorrecto. Esperado: ${expectedCountry}, Obtenido: ${countryText}`
          );
        }
      });
  });
}
 
}
export default RegisterPage;
