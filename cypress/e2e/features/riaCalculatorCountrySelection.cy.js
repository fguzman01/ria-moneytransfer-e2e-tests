
import { RiaCalculatorFlow } from '../../flows/RiaCalculatorFlow'
import { RiaCalculatorProvider } from '../../data/providers/RiaCalculatorProvider'

describe('Ria Calculator - Selección de país', () => {
  let calculatorFlow

  beforeEach(() => {
    calculatorFlow = new RiaCalculatorFlow()
  })

  it('Flujo completo: validación de mensaje, selección de país, moneda y conversión', () => {
    const data = RiaCalculatorProvider.getByCountry('Haiti')
    cy.log('[TEST] Ejecutando flujo completo de transferencia de dinero')
    calculatorFlow.completeMoneyTransferFlow(data)
  })
  
  afterEach(() => {
    cy.log('[AFTER] Test finalizado correctamente')
    // Separador visual en consola
    // eslint-disable-next-line no-console
    console.log('-------------------')
  })
})
