// Archivo de soporte global para Cypress E2E.
// Aquí puedes importar plugins o configurar hooks globales.

import '@shelex/cypress-allure-plugin';


// Ejemplo: Log de inicio del test

import '@shelex/cypress-allure-plugin';

// Intercepta y silencia recursos estáticos y tracking en cada test

const ignorePatterns = [
  '/_next/', '/_next/data/', '/flags/', '/static/', '/api/get-logos', '/functions/fetchReviews',
  'segment.com', 'doubleclick.net', 'facebook.com', 'posthog.com', 'netlify',
  '/css/', '/js/', '/fonts/', '/images/',
  'analytics.google.com/g/collect', 'ad.doubleclick.net/activity',
  '/send-money-to-africa.json', '/send-money-online.json', '/send-money-to-asia.json', '/send-money-to-europe.json',
  '/send-money-to-latin-america.json', '/send-money-to-north-america.json', '/receive-money-online.json', '/rates-conversion.json',
  '/wallets.json', '/ibancalculator.json', '/about-ria.json', '/services.json', '/become-a-digital-partner.json', '/become-a-strategic-partner.json', '/become-an-affiliate.json', '/become-an-agent-overview.json'
];


beforeEach(() => {
  // Intercepta patrones exactos
  ignorePatterns.forEach(pattern => {
    cy.intercept({ url: pattern }, () => {}).as(`ignore_${pattern}`);
  });
  // Intercepta cualquier request que contenga '/_next/data/' en la URL
  cy.intercept(/\/\_next\/data\//, () => {}).as('ignore_next_data');
  cy.log('🚀 Iniciando suite de pruebas E2E');
});
