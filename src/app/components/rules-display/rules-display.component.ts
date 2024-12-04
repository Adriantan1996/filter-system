import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { FormDataService } from '../utils/form-data.service';
import { TradeRule } from '../../main/main.component';
import { getConditionText } from './utils/getConditionText';

@Component({
  selector: 'app-rules-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rules-display.component.html',
  styleUrls: ['./rules-display.component.css'],
})
export class RulesDisplayComponent implements OnInit {
  formData$: Observable<TradeRule | null>;

  constructor(
    private formDataService: FormDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.formData$ = this.formDataService.formData$;
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  // Helper function to format the AND/OR logic
  getLogicText(subRules: any[]): string {
    return subRules
      .map((subRule, index) => {
        const operator = index > 0 ? 'AND' : '';
        const conditionText = getConditionText(
          subRule.field,
          subRule.condition,
          subRule.value
        );
        return operator + ' ' + conditionText;
      })
      .join(' ');
  }

  // Method to generate rule set display
  generateRules(formData: TradeRule | null): string {
    console.log(formData);
    if (!formData) {
      return '';
    }
    let ruleText = '';
    let finalRule = '';

    // Rule 1
    ruleText += 'Rule 1:\n';
    ruleText += this.getLogicText([
      {
        field: 'Price',
        condition: formData.priceOneCondition,
        value: formData.priceOne,
      },
      {
        field: 'Price',
        condition: formData.priceTwoCondition,
        value: formData.priceTwo,
      },
    ]);
    ruleText += '\n\n';

    // Rule 2
    ruleText += 'Rule 2:\n';
    ruleText += this.getLogicText([
      {
        field: 'Portfolio',
        condition: formData.portfolioOneCondition,
        value: formData.portfolioOne,
      },
      {
        field: 'Portfolio',
        condition: formData.portfolioTwoCondition,
        value: formData.portfolioTwoCondition,
      },
    ]);
    ruleText += '\n\n';

    // Rule 3
    ruleText += 'Rule 3:\n';
    ruleText += this.getLogicText([
      {
        field: 'Counterparty',
        condition: formData.counterPartyCondition,
        value: formData.counterParty,
      },
    ]);
    ruleText += '\n\n';

    // Final Configuration
    finalRule = `Final configuration should be Rule 1 AND Rule 2 AND Rule 3.`;

    return ruleText + finalRule;
  }
}
