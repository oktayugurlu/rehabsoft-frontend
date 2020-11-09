import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../security/authentication.service';
import {Patient} from '../../../models/patient';
import {Parent} from '../../../models/parent';
import {Phone} from '../../../models/phone';


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  registerForm: any;
  loading = false;
  submitted = false;
  error = '';

  submitbuttonOptions:any = {useSubmitBehavior: true, text: 'Create a new account', onClick: (Event)=>this.register(Event), width: '100%',type:"default"};


  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.registerForm = {
      username: '',
      password:  '',
      firstName: '',
      surname:  '',
      email: '',
      confirmPassword: ''
    };
  }

  ngOnInit() {

    this.authenticationService.logout();
  }

  register(event) {

    this.registerForm.username = this.registerForm.patient.tcKimlikNo;

    // stop here if form is invalid
    if (!event.validationGroup.validate().isValid) {
      return;
    }

    this.submitted = true;

    this.fillPhoneOfParent();

    this.loading = true;
    this.authenticationService.register(this.registerForm)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  confirmPassword = (e: { value: string }) => {
    return e.value === this.registerForm.password;
  }

  fillPhoneOfParent = ()=> {
    this.registerForm.phoneNumberListForParent1.forEach(phoneString=>{
      this.registerForm.parentCollection.push({
        phoneNumber: phoneString
      })
    });
    delete this.registerForm['phoneNumberListForParent1'];
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ CreateAccountFormComponent ],
  exports: [ CreateAccountFormComponent ]
})
export class CreateAccountFormModule { }
