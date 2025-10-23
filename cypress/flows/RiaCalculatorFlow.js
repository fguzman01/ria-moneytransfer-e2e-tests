import RiaHomePage from '../pages/RiaHomePage'
import { WebUtils } from '../utils/WebUtils'

export class RiaCalculatorFlow {
  constructor() {
    this.home = new RiaHomePage()
  }

  /**
   * Selecciona el país y valida la moneda destino
   * @param {string} country
   * @param {string} expectedCurrency
   */
  selectDestinationAndValidateCurrency(country, expectedCurrency) {
    cy.log(`[FLOW] Seleccionando país: ${country} y validando moneda destino: ${expectedCurrency}`)
    this.home.selectCountry(country)
    this.home.waitForDestinationCurrency(expectedCurrency)
    cy.log(`[FLOW ✅] País y moneda destino validados correctamente.`)
  }

  /**
   * Ingresa el monto inicial y valida la conversión al cambiar el monto
   * @param {number|string} initialAmount
   * @param {number|string} updatedAmount
   */
  enterAmountAndValidateConversion(initialAmount, updatedAmount) {
    cy.log(`[FLOW] Ingresando monto inicial: ${initialAmount}`)
    this.home.enterAmount(initialAmount)
    cy.log(`[FLOW] Validando actualización de conversión con monto: ${updatedAmount}`)
    this.home.validateConversionUpdates(updatedAmount)
    cy.log(`[FLOW ✅] Conversión validada correctamente tras actualizar el monto.`)
  }

  /**
   * Ejecuta el flujo completo de transferencia de dinero
   * @param {object} data - Objeto con country, receiveCurrency, amount, updatedAmount
   */
  completeMoneyTransferFlow(data) {
    cy.log('[FLOW] Iniciando flujo completo de transferencia de dinero.')
    WebUtils.navigateTo('/')
    this.home.validateHomeLoaded()
    cy.log('[FLOW] Validando mensaje de monto vacío.')
    this.home.validateEmptyAmountMessage()
    this.selectDestinationAndValidateCurrency(data.country, data.receiveCurrency)
    this.enterAmountAndValidateConversion(data.amount, data.updatedAmount)
    cy.log('[FLOW ✅] Flujo completo de transferencia finalizado correctamente.')
  }
}
