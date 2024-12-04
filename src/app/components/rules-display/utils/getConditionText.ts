import { RuleOneCondition, RuleTwoCondition } from "../../utils/formOptions.constants";

export const getConditionText = (field: string, condition: any, value: any): string => {
  let conditionText = '';
  switch (condition) {
    case RuleOneCondition.greaterThan:
      conditionText = `is Greater Than ${value}`;
      break;
    case RuleOneCondition.greaterThanOrEqualTo:
      conditionText = `is Greater Than or Equal To ${value}`;
      break;
    case RuleOneCondition.lessThan:
      conditionText = `is Less Than ${value}`;
      break;
    case RuleOneCondition.lessThanOrEqualTo:
      conditionText = `is Less Than or Equal To ${value}`;
      break;
    case RuleOneCondition.equalTo:
      conditionText = `is Equal To ${value}`;
      break;
    case RuleTwoCondition.containing:
      conditionText = `Containing '${value}'`;
      break;
    case RuleTwoCondition.notContaining:
      conditionText = `Not Containing '${value}'`;
      break;
    case RuleTwoCondition.beginningWith:
      conditionText = `Beginning With '${value}'`;
      break;
    case RuleTwoCondition.endingWith:
      conditionText = `Ending With '${value}'`;
      break;
    case RuleTwoCondition.equalTo:
      conditionText = `Equal To '${value}'`;
      break;
    case RuleTwoCondition.notEqualTo:
      conditionText = `Not Equal To '${value}'`;
      break;
    default:
      conditionText = 'No condition';
  }

  return `Define field: ${field}, which should be a ${typeof value} type, ${conditionText}.`;
}
