# Ria Money Transfer – E2E Test Suite

This repository contains end-to-end (E2E) automated tests for the **Ria Money Transfer** platform using **Cypress**, along with backend API tests using **Postman**.

## ✅ Key Features

- ✅ Modular architecture: Flows, Pages, Models, and Utils
- ✅ Page Object Model (POM) for maintainability
- ✅ Business logic coverage for Calculator and Registration
- ✅ Cookie banner handling for cross-domain flows
- ✅ Data-driven testing via providers
- ✅ Postman tests for GET/POST validations
- ✅ Allure integration for rich reporting with test history, environment, and steps
- ✅ Multi-browser support (Chrome, Firefox)

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18  
- npm >= 9  
- Chrome or Firefox installed

### Install dependencies

```bash
npm install
```

---

## 🧪 Running Tests


### Run tests with UI (headed mode)

```bash
npm run test:headed
```

### Run tests in a specific browser

```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
```

---

## 📊 Allure Reports

Allure is configured to generate detailed and interactive reports:

### Run tests and generate report:

```bash
npm run test:allure
```

This command will:
1. Run tests with Allure enabled (in UI mode)
2. Generate the report
3. Open the Allure UI

Alternatively, you can run commands individually:

```bash
npm run cypress:run:allure
npm run allure:generate
npm run allure:open
```

### Report Features:
- Interactive dashboard with trends and categories
- Step-by-step breakdown per test
- Failure screenshots and environment context
- Support for tags, epics, stories, and severity levels

---

## 📁 Project Structure

```
cypress/
├── e2e/                    # Test specs
│   ├── calculator.cy.js
│   └── registration.cy.js
├── flows/                  # Business Flows (e.g., CalculatorFlow, RegistrationFlow)
├── pages/                 # Page Object Models
├── models/                # Data models
├── providers/             # Test data by scenario
├── utils/                 # Web utility helpers
├── reports/
│   └── allure-results/    # Allure raw data
│   └── mochawesome/       # HTML reports (optional)
└── support/               # Custom Cypress commands and config
```

---

## 🧪 API Testing with Postman

The project includes a Postman collection covering:

### ✅ GET – Validate Posts

- Endpoint: `https://jsonplaceholder.typicode.com/posts`
- Assertions:
  - Status 200
  - Each `title` and `body` field is not empty
  - No content contains the word `zombie`

### ✅ POST – Validate Pizza Toppings

- Endpoint: `https://httpbin.org/post`
- Request body:
```json
{
  "student": "Tim Allen",
  "email_address": "tim@homeimprovement.com",
  "phone": "(408) 8674530",
  "current_grade": "B+",
  "topping": ["bacon", "cheese", "mushroom"]
}
```
- Assertions:
  - Status is 200 or 201
  - Toppings must include: bacon, cheese, mushroom
  - Must not contain: chicken

> The Postman collection is located in `/postman/Ria Money Transfer - API Tests.postman_collection.json`

---

## 📘 Configuration

Key configuration is located in `cypress.config.js`:
```js
baseUrl: 'https://www.riamoneytransfer.com'
```