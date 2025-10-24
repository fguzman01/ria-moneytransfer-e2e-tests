import RegisterFlow from '../../flows/RegisterFlow'

let registerFlow

describe('Flujo de registro - Validar redirección a selección de país', () => {
  beforeEach(() => {
    registerFlow = new RegisterFlow()
  })

  it('Debe redirigir a la página de selección de país al hacer clic en Register', () => {
    cy.log('[TEST] Iniciando validación del flujo de registro...')
    registerFlow.navigateToRegisterAndValidateCountry('Chile')
    cy.log('[TEST ✅] Validación de redirección completada correctamente.')
  })
})
