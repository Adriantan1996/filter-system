import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';
import { FormsComponent } from '../components/forms/forms.component';
import filterFunction from './utils/filterFunction';
import {
  RuleOneCondition,
  RuleTwoCondition,
} from '../components/utils/formOptions.constants';
import { FormEditComponent } from '../components/form-edit/form-edit.component';
import { FormDataService } from '../components/utils/form-data.service';
import { tableData } from './utils/table-data.service';
import { RulesDisplayComponent } from '../components/rules-display/rules-display.component';

export type TradeRule = {
  priceOneCondition: RuleOneCondition;
  priceOne: number;
  priceTwoCondition: RuleOneCondition;
  priceTwo: number;
  portfolioOneCondition: RuleTwoCondition;
  portfolioOne: string;
  portfolioTwoCondition: RuleTwoCondition;
  portfolioTwo: string;
  counterPartyCondition: RuleTwoCondition;
  counterParty: string;
};

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    FormsComponent,
    RulesDisplayComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  canEdit = false; // Initialize the canEdit flag to false

  tableData = tableData;
  filteredData = [...this.tableData];

  constructor(private formDataService: FormDataService) {}
  handleFilter() {
    const formsValue = this.formDataService.getFormData();
    console.log({ formsValue });
    this.filteredData = filterFunction(this.tableData, formsValue);
    this.canEdit = true;
  }
}
