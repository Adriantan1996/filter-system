import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import {
  ruleOneOptions,
  RulesOneType,
  RulesTwoType,
  ruleTwoOptions,
} from '../utils/formOptions.constants';
import { FormDataService } from '../utils/form-data.service';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    DropdownModule,
    SelectButtonModule,
  ],
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css'],
})
export class FormEditComponent implements OnInit {
  @Output() formSubmit = new EventEmitter();
  formGroup!: FormGroup;

  ruleOneOptions: RulesOneType[] | undefined;
  ruleTwoOptions: RulesTwoType[] | undefined;

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.ruleOneOptions = ruleOneOptions;
    this.ruleTwoOptions = ruleTwoOptions;

    const formData = this.formDataService.getFormData(); // Get the data from the store

    this.formGroup = new FormGroup({
      priceOneCondition: new FormControl(
        formData?.priceOneCondition,
        Validators.required
      ),
      priceOne: new FormControl(formData?.priceOne, Validators.required),
      priceTwoCondition: new FormControl(
        formData?.priceTwoCondition,
        Validators.required
      ),
      priceTwo: new FormControl(formData?.priceTwo, Validators.required),
      portfolioOneCondition: new FormControl(
        formData?.portfolioOneCondition,
        Validators.required
      ),
      portfolioOne: new FormControl(
        formData?.portfolioOne,
        Validators.required
      ),
      portfolioTwoCondition: new FormControl(
        formData?.portfolioTwoCondition,
        Validators.required
      ),
      portfolioTwo: new FormControl(
        formData?.portfolioTwo,
        Validators.required
      ),
      counterPartyCondition: new FormControl(
        formData?.counterPartyCondition,
        Validators.required
      ),
      counterParty: new FormControl(
        formData?.counterParty,
        Validators.required
      ),
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
