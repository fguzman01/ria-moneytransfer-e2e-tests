// cypress/utils/WebUtils.js
import { envConfig } from '../support/envConfig'

export class WebUtils {
  /**
   * Navega a una ruta específica usando la baseUrl definida en envConfig
   * @param {string} path - Ruta  baseUrl (ej: '/login')
   */
  static navigateTo(path = '') {
    const baseUrl = envConfig.baseUrl.endsWith('/') ? envConfig.baseUrl.slice(0, -1) : envConfig.baseUrl
    const fullPath = path.startsWith('/') ? path : `/${path}`
    const url = `${baseUrl}${path ? fullPath : ''}`
    

    console.log(`[NAVIGATE] Navegando a: ${url}`)
    
    cy.visit(url)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`[NAVIGATE ✅] Navegación exitosa: ${url}`)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`[NAVIGATE ❌] Error navegando a: ${url}`)
        // eslint-disable-next-line no-console
        console.error(err)
        throw new Error(`No se pudo navegar a la URL: ${url}`)
      })
    
    // Esperar que el body esté visible como verificación de carga
    cy.get('body', { timeout: envConfig.defaultTimeout }).should('be.visible')
  }

  /**
   * Espera a que un elemento sea visible y lo resalta
   * @param {string} selector - Selector del elemento
   * @param {number} timeoutMs - Tiempo máximo de espera en ms
   */
  static waitForElement(selector, timeoutMs = 10000) {
    console.log(`[WAIT] Esperando elemento: ${selector}`)
    cy.get(selector, { timeout: timeoutMs })
      .should('be.visible')
      .then($el => {
        // Highlight amarillo usando jQuery
        if ($el && $el.length) {
          Cypress.$($el).css({
            'background-color': 'yellow',
            'transition': 'background-color 0.3s',
          })
        }
        console.log(`[WAIT ✅] Elemento visible: ${selector}`)
      })
      .catch(err => {
        console.error(`[WAIT ❌] Elemento no visible: ${selector}`)
        console.error(err)
        throw new Error(`No se encontró el elemento: ${selector}`)
      })
  }
}

/**
 * Hace clic de forma segura en un selector, esperando visibilidad y loggeando el resultado.
 * @param {string} selector - Selector del elemento a hacer clic.
 * @param {number} [timeoutMs] - Tiempo máximo de espera en ms (opcional).
 */
export function safeClick(selector, timeoutMs) {
  console.log(`[CLICK] Intentando hacer clic en: ${selector}`)
  try {
    WebUtils.waitForElement(selector, timeoutMs)
    cy.get(selector).click({ force: true })
    console.log(`[CLICK ✅] Click exitoso en: ${selector}`)
  } catch (err) {
    console.error(`[CLICK ❌] Error al hacer clic en: ${selector} - ${err}`)
    throw err
  }
}

/**
 * Rellena un campo de texto de forma segura, esperando visibilidad y con logs.
 * @param {string} selector - Selector del input
 * @param {string} value - Valor a ingresar
 * @param {boolean} clearFirst - Si true, limpia antes de escribir (default true)
 * @param {number} timeoutMs - Tiempo máximo de espera (opcional)
 */
export function fillInput(selector, value, clearFirst = true, timeoutMs = 10000) {
  cy.log(`[FILL] Rellenando campo: ${selector} con valor: "${value}"`)
  try {
    WebUtils.waitForElement(selector, timeoutMs)
    cy.get(selector, { timeout: timeoutMs })
      .should('be.visible')
      .then(($el) => {
        if (clearFirst) {
          cy.wrap($el).clear()
        }
        cy.wrap($el).type(value)
      })
      .then(() => cy.log(`[FILL ✅] Campo rellenado: ${selector} con valor: "${value}"`))
  } catch (error) {
    cy.log(`[FILL ❌] Error al rellenar campo: ${selector} con valor: "${value}"`)
    throw new Error(`No se pudo rellenar el campo '${selector}' con valor '${value}'. Detalle: ${error}`)
  }
}
