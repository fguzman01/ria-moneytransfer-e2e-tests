// Archivo de soporte global para Cypress E2E.
// Aquí puedes importar plugins o configurar hooks globales.

import '@shelex/cypress-allure-plugin';

// Ejemplo: Log de inicio del test
before(() => {
  cy.log('🚀 Iniciando suite de pruebas E2E');
});
