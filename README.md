# RIA Money Transfer E2E Tests

Este proyecto contiene las pruebas end-to-end (E2E) para la aplicación de transferencias de dinero RIA usando Cypress.

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

## Comandos disponibles

### Ejecutar tests en modo interactivo
```bash
npm run cypress:open
```

### Ejecutar tests en modo headless
```bash
npm run cypress:run
```

### Ejecutar tests en diferentes navegadores
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
```

### Ejecutar tests con reportes Allure
```bash
npm run cypress:run:allure    # Ejecutar tests y generar datos de Allure
npm run allure:generate       # Generar reporte HTML
npm run allure:open          # Abrir reporte en el navegador
npm run allure:serve         # Generar y servir reporte directamente
npm run test:allure          # Ejecutar todo el flujo: tests + generar + abrir
```

## Estructura del proyecto

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

## Comandos personalizados

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

- Asegúrate de que la aplicación esté ejecutándose antes de correr los tests
- Los videos y screenshots se guardan automáticamente en caso de fallos
- Revisa la configuración en `cypress.config.js` según tus necesidades