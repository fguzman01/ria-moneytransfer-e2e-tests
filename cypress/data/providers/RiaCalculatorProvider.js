import { RiaCalculatorModel } from '../models/RiaCalculatorModel';

export class RiaCalculatorProvider {
  static getByCountry(country) {
    const dataMap = {
      Haiti: new RiaCalculatorModel('Haiti', 'CLP', 'HTG', 2500, 3000),
      Mexico: new RiaCalculatorModel('Mexico', 'CLP', 'MXN', 2500, 3000),
    };

  const data = dataMap[country];
  if (!data) throw new Error(`[DATA ] No configuration found for country: ${country}`);
  cy.log(`[DATA] Data found for: ${country}`);
  return data;
  }
}
