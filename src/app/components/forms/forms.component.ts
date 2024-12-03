import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';

export enum RuleOneCondition {
  greaterThan = 'greaterThan',
  lessThan = 'lessThan',
}

export enum RuleTwoCondition {
  contains = 'contains',
  exclude = 'exclude',
}
@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    SelectButtonModule,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<any>();
  formGroup!: FormGroup;
  ruleOneOptions = [
    { label: 'Greater Than', value: RuleOneCondition.greaterThan },
    { label: 'Less Than', value: RuleOneCondition.lessThan },
  ];
  ruleTwoOptions = [
    { label: 'Contains', value: RuleTwoCondition.contains },
    { label: 'Exclude', value: RuleTwoCondition.exclude },
  ];

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      priceOneCondition: new FormControl('', Validators.required),
      priceOne: new FormControl(),
      priceTwoCondition: new FormControl('', Validators.required),
      priceTwo: new FormControl(),
      portfolioOneCondition: new FormControl('', Validators.required),
      portfolioOne: new FormControl('', Validators.required),
      portfolioTwoCondition: new FormControl('', Validators.required),
      portfolioTwo: new FormControl('', Validators.required),
      counterParty: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
