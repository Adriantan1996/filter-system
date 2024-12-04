import {
  RuleOneCondition,
  RuleTwoCondition,
} from '../../components/utils/formOptions.constants';
import { TradeRule } from '../main.component';

function checkPriceCondition(
  condition: RuleOneCondition,
  price: number,
  compareValue: number
): boolean {
  switch (condition) {
    case RuleOneCondition.greaterThan:
      return price > compareValue;
    case RuleOneCondition.greaterThanOrEqualTo:
      return price >= compareValue;
    case RuleOneCondition.lessThan:
      return price < compareValue;
    case RuleOneCondition.lessThanOrEqualTo:
      return price <= compareValue;
    case RuleOneCondition.equalTo:
      return price === compareValue;
    default:
      return false; // fallback for unsupported conditions
  }
}

function checkPortfolioCondition(
  condition: RuleTwoCondition,
  portfolio: string,
  compareValue: string
): boolean {
  // Convert both portfolio and compareValue to lowercase for case-insensitive comparison
  const portfolioLowerCase = portfolio.toLowerCase();
  const compareValueLowerCase = compareValue.toLowerCase();

  switch (condition) {
    case RuleTwoCondition.containing:
      return portfolioLowerCase.includes(compareValueLowerCase);
    case RuleTwoCondition.notContaining:
      return !portfolioLowerCase.includes(compareValueLowerCase);
    case RuleTwoCondition.beginningWith:
      return portfolioLowerCase.startsWith(compareValueLowerCase);
    case RuleTwoCondition.endingWith:
      return portfolioLowerCase.endsWith(compareValueLowerCase);
    case RuleTwoCondition.equalTo:
      return portfolioLowerCase === compareValueLowerCase;
    case RuleTwoCondition.notEqualTo:
      return portfolioLowerCase !== compareValueLowerCase;
    default:
      return false; // fallback for unsupported conditions
  }
}

function filterFunction(data: any[], tradeRule: TradeRule): any[] {
  const filterPriceOne = data.filter(({ price }) => {
    return checkPriceCondition(
      tradeRule.priceOneCondition,
      price,
      tradeRule.priceOne
    );
  });
  const filterPriceTwo = data.filter(({ price }) => {
    return checkPriceCondition(
      tradeRule.priceTwoCondition,
      price,
      tradeRule.priceTwo
    );
  });
  // Rule 1: Price - both conditions must be satisfied (AND operator)
  // so filter based on two different subArray and combined back a single final array
  // create a new array and remove any duplicates
  const finalFilterPriceArray = [
    ...new Map(
      [...filterPriceOne, ...filterPriceTwo].map((item) => [
        item.tradeNumber,
        item,
      ])
    ).values(),
  ];

  return finalFilterPriceArray.filter(({ counterParty, portfolio }) => {
    // Rule 2: Portfolio - both conditions must be satisfied (AND operator)

    const ruleTwoSubOne = checkPortfolioCondition(
      tradeRule.portfolioOneCondition,
      portfolio,
      tradeRule.portfolioOne
    );
    const ruleTwoSubTwo = checkPortfolioCondition(
      tradeRule.portfolioTwoCondition,
      portfolio,
      tradeRule.portfolioTwo
    );
    const ruleTwo = ruleTwoSubTwo && ruleTwoSubOne;

    // Rule 3: CounterParty - must start with the specified value
    const ruleThree =
      typeof counterParty === 'string' &&
      checkPortfolioCondition(
        tradeRule.counterPartyCondition,
        counterParty,
        tradeRule.counterParty
      );

    return ruleThree && ruleTwo;
  });
}

export default filterFunction;
