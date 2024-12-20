import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DropdownModule } from 'primeng/dropdown';
import {
  ruleOneOptions,
  RulesOneType,
  RulesTwoType,
  ruleTwoOptions,
} from '../utils/formOptions.constants';
import { FormDataService } from '../utils/form-data.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    SelectButtonModule,
    DropdownModule,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  @Output() formSubmit = new EventEmitter();
  formGroup!: FormGroup;

  ruleOneOptions: RulesOneType[] | undefined;
  ruleTwoOptions: RulesTwoType[] | undefined;

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.ruleOneOptions = ruleOneOptions;
    this.ruleTwoOptions = ruleTwoOptions;
    // initiate form
    this.formGroup = new FormGroup({
      priceOneCondition: new FormControl('', Validators.required),
      priceOne: new FormControl(null, Validators.required),
      priceTwoCondition: new FormControl('', Validators.required),
      priceTwo: new FormControl(null, Validators.required),
      portfolioOneCondition: new FormControl('', Validators.required),
      portfolioOne: new FormControl('', Validators.required),
      portfolioTwoCondition: new FormControl('', Validators.required),
      portfolioTwo: new FormControl('', Validators.required),
      counterPartyCondition: new FormControl('', Validators.required),
      counterParty: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      // Map the condition fields to their corresponding codes
      const formValue = this.formGroup.value;

      const transformedFormData = {
        ...formValue,
        priceOneCondition: formValue.priceOneCondition?.code,
        priceTwoCondition: formValue.priceTwoCondition?.code,
        portfolioOneCondition: formValue.portfolioOneCondition?.code,
        portfolioTwoCondition: formValue.portfolioTwoCondition?.code,
        counterPartyCondition: formValue.counterPartyCondition?.code,
      };

      // Set the transformed form data
      this.formDataService.setFormData(transformedFormData);
      this.formSubmit.emit();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
