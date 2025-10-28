// Global support file for Cypress E2E.


import '@shelex/cypress-allure-plugin';
import '@shelex/cypress-allure-plugin';

// Filter to ignore specific resource requests during tests 

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
  ignorePatterns.forEach(pattern => {
    cy.intercept({ url: pattern }, () => {}).as(`ignore_${pattern}`);
  });
  cy.intercept(/\/\_next\/data\//, () => {}).as('ignore_next_data');
  cy.log('🚀 Iniciando suite de pruebas E2E');
});
