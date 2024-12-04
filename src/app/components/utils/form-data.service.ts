import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<any>(null); // Store data in a BehaviorSubject

  // Observable to get the form data
  formData$ = this.formDataSubject.asObservable();

  // Set the form data in the store
  setFormData(data: any) {
    this.formDataSubject.next(data);
  }

  // Get the current form data
  getFormData() {
    return this.formDataSubject.getValue();
  }
}
