
# Ria Money Transfer E2E Tests

This repository contains end-to-end (E2E) automated tests for the Ria Money Transfer web application using Cypress.

## Features
- Modular Cypress architecture (flows, pages, data, utils)
- Data-driven testing with providers and models
- Business logic flows for registration and calculator
- Clean and maintainable Page Object pattern
- Cookie banner handling and robust navigation utilities
- Multi-language support for logs and comments
- Mochawesome HTML reports for unified test results

## Getting Started

- Node.js >= 18
- npm >= 9
- Chrome or Firefox browser installed

### Installation
```bash
npm install
```

### Running Tests
- Run all tests (headless):
```bash
npm run test
```
- Run all tests in Chrome UI:
```bash
npm run test:headed
```

### Generating Unified Mochawesome Report
After running tests:
```bash
npx mochawesome-merge cypress/reports/mochawesome/*.json --output cypress/reports/mochawesome/mochawesome-merged.json
npx mochawesome-report-generator cypress/reports/mochawesome/mochawesome-merged.json -o cypress/reports/mochawesome/merged-report.html
```
Open `cypress/reports/mochawesome/merged-report.html` in your browser to view the results.

## Project Structure
```
cypress/
    e2e/features/         # Test specs
    flows/                # Business flows

## Customization
## License
MIT

```
cypress/
├── e2e/                    # Tests E2E
│   └── money-transfer.cy.js
├── fixtures/               # Datos de prueba
│   └── example.json
└── support/               # Comandos personalizados y configuración
    ├── commands.js
    └── e2e.js
```

## Configuración

La configuración principal se encuentra en `cypress.config.js`. Asegúrate de actualizar la `baseUrl` con la URL de tu aplicación.

```javascript
baseUrl: 'http://localhost:3000' // Cambia esto por tu URL
```

### `cy.login(username, password)`
Realiza el login en la aplicación.

### `cy.initiateMoneyTransfer(amount, recipient)`
Inicia una transferencia de dinero.

## Reportes con Allure

Este proyecto está configurado para generar reportes detallados con **Allure Framework**:

### Características de los reportes:
- **Dashboard interactivo** con métricas de ejecución
- **Historial de ejecuciones** y tendencias
- **Categorización de tests** por severidad y tags
- **Steps detallados** de cada test
- **Screenshots automáticos** en caso de fallos
- **Información de entorno** y configuración

### Anotaciones Allure disponibles:
- `cy.allure().epic('name')` - Agrupa funcionalidades grandes
- `cy.allure().feature('name')` - Agrupa características relacionadas
- `cy.allure().story('name')` - Describe la historia de usuario
- `cy.allure().severity('level')` - Nivel: blocker, critical, normal, minor, trivial
- `cy.allure().tag('tag')` - Etiquetas para filtrado
- `cy.allure().step('description')` - Pasos del test
- `cy.allure().description('text')` - Descripción detallada

## Selectores de datos

Este proyecto usa selectores `data-cy` para una mejor estabilidad de las pruebas:

```html
<button data-cy="login-button">Login</button>
<input data-cy="amount-input" />
<input data-cy="recipient-input" />
```

## Mejores prácticas

1. Usa selectores `data-cy` en lugar de clases o IDs
2. Mantén los tests independientes entre sí
3. Usa fixtures para datos de prueba
4. Limpia el estado entre tests cuando sea necesario
5. Agrupa tests relacionados en el mismo archivo `describe`

## Notas importantes

