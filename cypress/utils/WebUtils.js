// cypress/utils/WebUtils.js
import { envConfig } from '../support/envConfig'


export class WebUtils {

  /**
   * Maneja el banner de cookies si aparece
   */
  static handleCookieBanner() {
  cy.log('[COOKIES] Esperando redirección al dominio seguro...');

  // ⚠️ Usamos dominio directo para evitar restricciones de scope en cy.origin()
  cy.url({ timeout: 15000 }).should('include', 'secure.riamoneytransfer.com');

  cy.origin('https://secure.riamoneytransfer.com', () => {
    cy.log('[COOKIES] En dominio seguro, verificando banner...');
    cy.wait(2000); // pequeña espera para render del modal

    cy.contains('Allow all cookies', { timeout: 5000 }).then(
      ($btn) => {
        if ($btn && $btn.length && $btn.is(':visible')) {
          cy.wrap($btn).click({ force: true });
          cy.log('[COOKIES ✅] Banner de cookies aceptado.');
        } else {
          cy.log('[COOKIES] No se detectó banner de cookies.');
        }
      },
      () => {
        cy.log('[COOKIES] No se detectó banner de cookies.');
      }
    );
  });
}


  /**
   * Navega a una ruta específica usando la baseUrl definida en envConfig
   * @param {string} path - Ruta baseUrl (ej: '/login')
   */
  static navigateTo(path = '') {
    const baseUrl = envConfig.baseUrl.endsWith('/') ? envConfig.baseUrl.slice(0, -1) : envConfig.baseUrl
    const fullPath = path.startsWith('/') ? path : `/${path}`
    const url = `${baseUrl}${path ? fullPath : ''}`
    cy.log(`[NAVIGATE] Navegando a: ${url}`)
    cy.visit(url)
    cy.log(`[NAVIGATE ✅] Navegación exitosa: ${url}`)
    cy.get('body', { timeout: envConfig.defaultTimeout }).should('be.visible')
  }

  /**
   * Espera a que un elemento sea visible y lo resalta
   * @param {string} selector - Selector del elemento
   * @param {number} timeoutMs - Tiempo máximo de espera en ms
   */
  static waitForElement(selector, timeoutMs = 30000) {
    cy.log(`[WAIT] Esperando elemento: ${selector}`)
    cy.get(selector, { timeout: timeoutMs })
      .should('be.visible')
      .then($el => {
        // Resalta el elemento brevemente
        const orig = $el.css('box-shadow')
        $el.css('box-shadow', '0 0 0 2px #ff9800')
        setTimeout(() => $el.css('box-shadow', orig), 300)
      })
    cy.log(`[WAIT ✅] Elemento visible: ${selector}`)
  }

  /**
   * Hace clic de forma segura en un selector, esperando visibilidad y loggeando el resultado.
   * @param {string} selector - Selector del elemento a hacer clic.
   * @param {number} [timeoutMs] - Tiempo máximo de espera en ms (opcional).
   */
  static safeClick(selector, timeoutMs = 10000) {
    cy.log(`[CLICK] Intentando hacer clic en: ${selector}`)
    WebUtils.waitForElement(selector, timeoutMs)
    cy.get(selector, { timeout: timeoutMs }).click({ force: true })
    cy.log(`[CLICK ✅] Click exitoso en: ${selector}`)
  }

  /**
   * Rellena un campo de texto de forma segura, esperando visibilidad y con logs.
   * @param {string} selector - Selector del input
   * @param {string} value - Valor a ingresar
   * @param {boolean} clearFirst - Si true, limpia antes de escribir (default true)
   * @param {number} timeoutMs - Tiempo máximo de espera (opcional)
   */
  static fillInput(selector, value, clearFirst = true, timeoutMs = 10000) {
    cy.log(`[FILL] Rellenando campo: ${selector} con valor: "${value}"`)
    WebUtils.waitForElement(selector, timeoutMs)
    cy.get(selector, { timeout: timeoutMs })
      .should('be.visible')
      .then($el => {
        if (clearFirst) {
          cy.wrap($el).clear()
        }
        cy.wrap($el).type(value)
      })
    cy.log(`[FILL ✅] Campo rellenado: ${selector} con valor: "${value}"`)
  }
}




