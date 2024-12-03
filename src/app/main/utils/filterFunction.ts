import {
  RuleOneCondition,
  RuleTwoCondition,
} from '../../components/forms/forms.component';
import { TradeRule } from '../main.component';

function checkPriceCondition(
  condition: RuleOneCondition,
  price: number,
  compareValue: number
): boolean {
  if (condition === RuleOneCondition.greaterThan) {
    return price > compareValue;
  } else if (condition === RuleOneCondition.lessThan) {
    return price < compareValue;
  }
  return false; // fallback in case of invalid condition
}

function checkPortfolioCondition(
  condition: RuleTwoCondition,
  portfolio: string,
  compareValue: string
): boolean {
  if (condition === RuleTwoCondition.contains) {
    return portfolio.includes(compareValue);
  } else if (condition === RuleTwoCondition.exclude) {
    return !portfolio.includes(compareValue);
  }
  return false; // fallback in case of invalid condition
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
      counterParty.startsWith(tradeRule.counterParty);

    return ruleThree && ruleTwo;
  });
}

export default filterFunction;
