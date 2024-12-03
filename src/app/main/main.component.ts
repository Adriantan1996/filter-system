import { Component } from '@angular/core';
import { TableComponent } from '../components/table/table.component';
import {
  FormsComponent,
  RuleOneCondition,
  RuleTwoCondition,
} from '../components/forms/forms.component';
import filterFunction from './utils/filterFunction';

export type TradeRule = {
  priceOneCondition: RuleOneCondition;
  priceOne: number;
  priceTwoCondition: RuleOneCondition;
  priceTwo: number;
  portfolioOneCondition: RuleTwoCondition;
  portfolioOne: string;
  portfolioTwoCondition: RuleTwoCondition;
  portfolioTwo: string;
  counterParty: string;
};

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TableComponent, FormsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  tableData = [
    {
      id: '1',
      tradeNumber: '001',
      portfolio: 'Company A Fund',
      counterParty: 'SG Bank',
      price: 1500,
    },
    {
      id: '2',
      tradeNumber: '002',
      portfolio: 'Company B Assets',
      counterParty: 'JP Bank6',
      price: 2000,
    },
    {
      id: '3',
      tradeNumber: '003',
      portfolio: 'Global Fund',
      counterParty: 'SG Securities',
      price: 1200,
    },
    {
      id: '4',
      tradeNumber: '004',
      portfolio: 'International Fund',
      counterParty: 'SG Holdings',
      price: -1500,
    },
    {
      id: '5',
      tradeNumber: '005',
      portfolio: 'Company C Equity',
      counterParty: 'FR Bank',
      price: 800,
    },
    {
      id: '6',
      tradeNumber: '006',
      portfolio: 'Global Fund',
      counterParty: 'SG Capital',
      price: 1100,
    },
    {
      id: '7',
      tradeNumber: '007',
      portfolio: 'Company A Equity',
      counterParty: 'SG Bank',
      price: -2000,
    },
    {
      id: '8',
      tradeNumber: '008',
      portfolio: 'Company D Fund',
      counterParty: 'US Bank',
      price: 300,
    },
  ];

  filteredData = [...this.tableData];

  handleFilter(formsValue: TradeRule) {
    this.filteredData = filterFunction(this.tableData, formsValue);
  }
}
