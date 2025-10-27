// cypress/utils/WebUtils.js
import { envConfig } from '../support/envConfig'


export class WebUtils {

  /**
   * Handles the cookie banner if it appears
   */
  static handleCookieBanner() {
  cy.log('[COOKIES] Waiting for redirection to secure domain...');

  // change context
  cy.url({ timeout: 15000 }).should('include', 'secure.riamoneytransfer.com');

  cy.origin('https://secure.riamoneytransfer.com', () => {
  cy.log('[COOKIES] In secure domain, checking banner...');
    cy.wait(2000); // wait for potential banner load

    cy.contains('Allow all cookies', { timeout: 5000 }).then(
      ($btn) => {
        if ($btn && $btn.length && $btn.is(':visible')) {
          cy.wrap($btn).click({ force: true });
          cy.log('[COOKIES] Cookie banner accepted.');
        } else {
          cy.log('[COOKIES] No cookie banner detected.');
        }
      },
      () => {
  cy.log('[COOKIES] No cookie banner detected.');
      }
    );
  });
}


  /**
   * Navigates to a specific route using the baseUrl defined in envConfig
   * @param {string} path - baseUrl route (e.g., '/login')
   */
  static navigateTo(path = '') {
    const baseUrl = envConfig.baseUrl.endsWith('/') ? envConfig.baseUrl.slice(0, -1) : envConfig.baseUrl
    const fullPath = path.startsWith('/') ? path : `/${path}`
    const url = `${baseUrl}${path ? fullPath : ''}`
  cy.log(`[NAVIGATE] Navigating to: ${url}`)
    cy.visit(url)
  cy.log(`[NAVIGATE ✅] Navigation successful: ${url}`)
    cy.get('body', { timeout: envConfig.defaultTimeout }).should('be.visible')
  }

  /**
   * Waits for an element to be visible and highlights it
   * @param {string} selector - Element selector
   * @param {number} timeoutMs - Maximum wait time in ms
   */
  static waitForElement(selector, timeoutMs = 30000) {
  cy.log(`[WAIT] Waiting for element: ${selector}`)
    cy.get(selector, { timeout: timeoutMs })
      .should('be.visible')
      .then($el => {
        // Highlight the element 
        const orig = $el.css('box-shadow')
        $el.css('box-shadow', '0 0 0 2px #ff9800')
        setTimeout(() => $el.css('box-shadow', orig), 300)
      })
  cy.log(`[WAIT ✅] Element visible: ${selector}`)
  }

  /**
   * Safely clicks a selector, waiting for visibility and logging the result.
   * @param {string} selector - Selector of the element to click.
   * @param {number} [timeoutMs] - Maximum wait time in ms (optional).
   */
  static safeClick(selector, timeoutMs = 10000) {
  cy.log(`[CLICK] Trying to click: ${selector}`)
    WebUtils.waitForElement(selector, timeoutMs)
    cy.get(selector, { timeout: timeoutMs }).click({ force: true })
  cy.log(`[CLICK ✅] Successful click on: ${selector}`)
  }

  /**
   * Safely fills a text field, waiting for visibility and logging.
   * @param {string} selector - Input selector
   * @param {string} value - Value to enter
   * @param {boolean} clearFirst - If true, clears before typing (default true)
   * @param {number} timeoutMs - Maximum wait time (optional)
   */
  static fillInput(selector, value, clearFirst = true, timeoutMs = 10000) {
  cy.log(`[FILL] Filling field: ${selector} with value: "${value}"`)
    WebUtils.waitForElement(selector, timeoutMs)
    cy.get(selector, { timeout: timeoutMs })
      .should('be.visible')
      .then($el => {
        if (clearFirst) {
          cy.wrap($el).clear()
        }
        cy.wrap($el).type(value)
      })
  cy.log(`[FILL] Field filled: ${selector} with value: "${value}"`)
  }
}




