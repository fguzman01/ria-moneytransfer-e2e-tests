import RiaHomePage from '../pages/RiaHomePage';
import RegisterPage from '../pages/RegisterPage';
import { WebUtils } from '../utils/WebUtils';

export default class RegisterFlow {
  constructor() {
    cy.log('[FLOW] Initializing RegisterFlow...');
    this.home = new RiaHomePage();
    this.register = new RegisterPage();
  }

  navigateToRegisterAndValidateCountry(expectedCountry) {
    cy.log('[FLOW] Starting register flow...');
    WebUtils.navigateTo('/')
    this.home.validateHomeLoaded()
    this.home.clickRegisterButton();
    
  cy.log('[FLOW] Checking cookie banner before validating country...');
    WebUtils.handleCookieBanner();
    
    this.register.validateCountrySelectionPage(expectedCountry);
  cy.log('[FLOW ✅] Register flow validated successfully.');
  }
}
