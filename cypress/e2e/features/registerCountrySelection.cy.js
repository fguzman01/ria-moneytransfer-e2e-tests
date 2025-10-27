import RegisterFlow from '../../flows/RegisterFlow'

let registerFlow

describe('Register flow - Validate redirection to country selection', () => {
  beforeEach(() => {
    registerFlow = new RegisterFlow()
  })

  it('Should redirect to country selection page when clicking Register', () => {
    cy.log('[TEST] Starting register flow validation...')
    registerFlow.navigateToRegisterAndValidateCountry('Chile')
    cy.log('[TEST ✅] Redirection validation completed successfully.')
  })
})
