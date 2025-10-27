import RiaHomePage from '../pages/RiaHomePage'
import { WebUtils } from '../utils/WebUtils'

export class RiaCalculatorFlow {
  constructor() {
    this.home = new RiaHomePage()
  }

  /**
   * Selects the country and validates the destination currency
   * @param {string} country
   * @param {string} expectedCurrency
   */
  selectDestinationAndValidateCurrency(country, expectedCurrency) {
    this.home.selectCountry(country);
    this.home.waitForDestinationCurrency(expectedCurrency);
  }

  /**
   * Enters the initial amount and validates the conversion when changing the amount
   * @param {number|string} initialAmount
   * @param {number|string} updatedAmount
   */
  enterAmountAndValidateConversion(initialAmount, updatedAmount) {
    this.home.enterAmount(initialAmount);
    this.home.validateConversionUpdates(updatedAmount);
  }

  /**
   * Executes the complete money transfer flow
   * @param {object} data - Object with country, receiveCurrency, amount, updatedAmount
   */
  completeMoneyTransferFlow(data) {
    WebUtils.navigateTo('/');
    this.home.validateHomeLoaded();
    this.home.validateEmptyAmountMessage();
    this.selectDestinationAndValidateCurrency(data.country, data.receiveCurrency);
    this.enterAmountAndValidateConversion(data.amount, data.updatedAmount);
  }
}
