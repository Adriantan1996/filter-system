export enum RuleOneCondition {
  greaterThan = 'greaterThan',
  greaterThanOrEqualTo = 'greaterThanOrEqualTo',
  lessThan = 'lessThan',
  lessThanOrEqualTo = 'lessThanOrEqualTo',
  equalTo = 'equalTo'
}

export enum RuleTwoCondition {
  containing = 'containing',
  notContaining = 'notContaining',
  beginningWith = 'beginningWith',
  endingWith = 'endingWith',
  equalTo = 'equalTo',
  notEqualTo = 'notEqualTo',
}

export interface RulesOneType {
  name: string;
  code: RuleOneCondition;
}

export interface RulesTwoType {
  name: string;
  code: RuleTwoCondition;
}

export const ruleOneOptions: RulesOneType[] = [
  { name: 'Greater Than', code: RuleOneCondition.greaterThan },
  { name: 'Greater Than or Equal To', code: RuleOneCondition.greaterThanOrEqualTo },
  { name: 'Less Than', code: RuleOneCondition.lessThan },
  { name: 'Less Than or Equal To', code: RuleOneCondition.lessThanOrEqualTo },
  { name: ' Equal To', code: RuleOneCondition.equalTo },
];

export const ruleTwoOptions:RulesTwoType[] = [
  { name: 'Containing', code: RuleTwoCondition.containing },
  { name: 'Not Containing', code: RuleTwoCondition.notContaining },
  { name: 'Beginning With', code: RuleTwoCondition.beginningWith },
  { name: 'Ending With', code: RuleTwoCondition.endingWith },
  { name: 'Equal To', code: RuleTwoCondition.equalTo },
  { name: 'Not Equal To', code: RuleTwoCondition.notEqualTo },
];
