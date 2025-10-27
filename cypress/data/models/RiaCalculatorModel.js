// cypress/data/models/RiaCalculatorModel.js

export class RiaCalculatorModel {
  /**
   * @param {string} country
   * @param {string} sendCurrency
   * @param {string} receiveCurrency
   * @param {number} amount
   * @param {number} updatedAmount
   */
  constructor(country, sendCurrency, receiveCurrency, amount, updatedAmount) {
    this.country = country;
    this.sendCurrency = sendCurrency;
    this.receiveCurrency = receiveCurrency;
    this.amount = amount;
    this.updatedAmount = updatedAmount;
  }

  getSummary() {
    return `Send ${this.amount} ${this.sendCurrency} a ${this.country} (${this.receiveCurrency}), luego actualizar a ${this.updatedAmount}`;
  }
}
