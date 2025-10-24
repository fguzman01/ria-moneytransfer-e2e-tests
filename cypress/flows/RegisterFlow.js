import RiaHomePage from '../pages/RiaHomePage';
import RegisterPage from '../pages/RegisterPage';
import { WebUtils } from '../utils/WebUtils';

export default class RegisterFlow {
  constructor() {
    cy.log('[FLOW] Inicializando RegisterFlow...');
    this.home = new RiaHomePage();
    this.register = new RegisterPage();
  }

  navigateToRegisterAndValidateCountry(expectedCountry) {
    cy.log('[FLOW] Iniciando flujo de registro...');
    WebUtils.navigateTo('/')
    this.home.validateHomeLoaded()
    this.home.clickRegisterButton();
    
    cy.log('[FLOW] Verificando banner de cookies antes de validar país...');
    WebUtils.handleCookieBanner();
    
    this.register.validateCountrySelectionPage(expectedCountry);
    cy.log('[FLOW ✅] Flujo de registro validado correctamente.');
  }
}
