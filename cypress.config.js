const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config)
      return config
    },
    baseUrl: 'https://www.riamoneytransfer.com/', // Cambia esto por la URL de tu aplicación
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    // Configuración de Allure
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      allureResultsPath: 'cypress/reports/allure-results',
    },
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
})