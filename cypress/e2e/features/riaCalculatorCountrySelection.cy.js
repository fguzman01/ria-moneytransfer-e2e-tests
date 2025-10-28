
import { RiaCalculatorFlow } from '../../flows/RiaCalculatorFlow'
import { RiaCalculatorProvider } from '../../data/providers/RiaCalculatorProvider'

describe('Ria Calculator - Country selection', () => {
  let calculatorFlow

  beforeEach(() => {
    calculatorFlow = new RiaCalculatorFlow()
  })

  it('Full flow: message validation, country selection, currency and conversion', () => {
    const data = RiaCalculatorProvider.getByCountry('Haiti')
    cy.log('[TEST] Executing full money transfer flow')
    calculatorFlow.completeMoneyTransferFlow(data)
  })
  
  afterEach(() => {
    cy.log('[AFTER] Test finished successfully')
    
  })
})
