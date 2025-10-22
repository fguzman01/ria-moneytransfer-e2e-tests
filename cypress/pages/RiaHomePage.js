// cypress/pages/RiaHomePage.js
import BasePage from './BasePage'
import { WebUtils, safeClick, fillInput } from '../utils/WebUtils'

class RiaHomePage extends BasePage {
  constructor() {
    super()
    this.url = '/'
    // Locators reales del Ria Calculator
    this.sendingAmountInput = '#sending-amount'
    this.receivingAmountInput = '#receiving-amount'
    this.currencyDropdown = 'div[role="button"].dropdown-selected'
    this.primaryButton = 'a[role="button"][name="primary"]'
    this.countrySearchInput = '#destinationCountry'
  }

  validateHomeLoaded() {
    console.log('[VALIDATE] Validando carga de la Home de Ria...')
    WebUtils.waitForElement(this.currencyDropdown)
    WebUtils.waitForElement(this.sendingAmountInput)
    WebUtils.waitForElement(this.receivingAmountInput)
    WebUtils.waitForElement(this.primaryButton)
    console.log('[VALIDATE ✅] Home de Ria cargada correctamente.')
  }

  /**
   * Selecciona un país en el dropdown de país.
   * @param {string} country - Nombre visible del país a seleccionar
   */
  selectCountry(country) {
    WebUtils.waitForElement(this.currencyDropdown)
    safeClick(this.currencyDropdown)
    WebUtils.waitForElement(this.countrySearchInput)
    fillInput(this.countrySearchInput, country, true)
    const countryOption = `span.complete-text:contains('${country}')`
    WebUtils.waitForElement(countryOption)
    safeClick(countryOption)
    console.log(`[ACTION ✅] País seleccionado: ${country}`)
  }
}

export default RiaHomePage