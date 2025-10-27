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
    this.home.selectCountry(country);
    this.home.waitForDestinationCurrency(expectedCurrency);
  }

  /**
   * Ingresa el monto inicial y valida la conversión al cambiar el monto
   * @param {number|string} initialAmount
   * @param {number|string} updatedAmount
   */
  enterAmountAndValidateConversion(initialAmount, updatedAmount) {
    this.home.enterAmount(initialAmount);
    this.home.validateConversionUpdates(updatedAmount);
  }

  /**
   * Ejecuta el flujo completo de transferencia de dinero
   * @param {object} data - Objeto con country, receiveCurrency, amount, updatedAmount
   */
  completeMoneyTransferFlow(data) {
    WebUtils.navigateTo('/');
    this.home.validateHomeLoaded();
    this.home.validateEmptyAmountMessage();
    this.selectDestinationAndValidateCurrency(data.country, data.receiveCurrency);
    this.enterAmountAndValidateConversion(data.amount, data.updatedAmount);
  }
}
