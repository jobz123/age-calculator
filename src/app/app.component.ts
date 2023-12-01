import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'age-cal';

  public date = new Date()
  public intYears: any  = '--'
  public intMonths: any = '--'
  public intDays: any = '--'
  profileForm: FormGroup;
  isValidDate:boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.profileForm = this.formBuilder.group({
      day: ['',[ Validators.required, Validators.min(1), Validators.max(31)]],
      month: ['',[ Validators.required, Validators.min(1), Validators.max(12) ]],
      year: ['',[ Validators.required, Validators.min(1),Validators.max(this.date.getFullYear())]],
    });
  }

  getErrors(profileFormName:string, validatorName:string) {
    return this.profileForm.controls[profileFormName].errors?.[validatorName]  
  }

  calculateUserAge():void {
    this.intYears = this.date.getFullYear() -  this.profileForm.value.year
    this.intMonths = this.date.getMonth() + 1 - this.profileForm.value.month
    this.intDays = Math.abs(this.date.getDate() - this.profileForm.value.day)
    console.log('YMD',this.date.getDate() , this.profileForm.value.day );
  }

  isDateValid(){
    const day = this.profileForm.get('day');
    const month = this.profileForm.get('month')
    return (
      day && month && month.value === 2 && day.value > 28 ||
      day && month && month.value === 4 && day.value > 30 ||
      day && month && month.value === 6 && day.value > 30 ||
      day && month && month.value === 9 && day.value > 30 ||
      day && month && month.value === 11 && day.value > 30 
  
      ? this.isValidDate = false  : this.isValidDate = true
    )
  }

  onSubmit():any {
    console.log(this.profileForm.valid)
    if (this.profileForm.invalid) {
      this.profileForm.markAsDirty()
      return 
    }
    this.profileForm.markAsPristine()
    this.calculateUserAge()
  }
}
