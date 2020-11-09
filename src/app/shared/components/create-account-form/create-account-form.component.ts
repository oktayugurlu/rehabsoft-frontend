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
  addPhoneButtonOptions1: any;
  addPhoneButtonOptions2: any;

  phoneOptions1: any[] = [];
  phoneOptions2: any[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.registerForm = {
      username: '',
      password:  '',
      firstName: '',
      surname:  '',
      email: '',
      confirmPassword: '',
      phoneNumberListForParent1: [],
      phoneNumberListForParent2: [],
      patient: new Patient()
    };
    this.registerForm.parentCollection = [new Parent(), new Parent()];

    this.addPhoneButtonOptions1 = {
      icon: "add",
      text: "Add phone",
      onClick: () => {
        this.registerForm.phoneNumberListForParent1.push("");
        this.phoneOptions1 = this.getPhonesOptions1(this.registerForm.phoneNumberListForParent1);
      }
    };

    this.addPhoneButtonOptions2 = {
      icon: "add",
      text: "Add phone",
      onClick: () => {
        this.registerForm.phoneNumberListForParent2.push("");
        this.phoneOptions2 = this.getPhonesOptions2(this.registerForm.phoneNumberListForParent2);
      }
    };
  }

  ngOnInit() {

    this.authenticationService.logout();
  }

  getPhonesOptions1(phones: any) {
    let options = [];
    for (let i = 0; i < phones.length; i++){
      options.push(this.generateNewPhoneOptions1(i));
    }
    return options;
  }

  getPhonesOptions2(phones: any) {
    let options = [];
    for (let i = 0; i < phones.length; i++){
      options.push(this.generateNewPhoneOptions2(i));
    }
    return options;
  }

  generateNewPhoneOptions1(index: number) {
    return {
      mask: "(X00) 000-0000",
      maskRules: {"X": /[01-9]/},
      buttons: [{
        name: "trash",
        location: "after",
        options: {
          stylingMode: "text",
          icon: "trash",
          onClick: () => {
            this.registerForm.phoneNumberListForParent1.splice(index, 1);
            this.phoneOptions1 = this.getPhonesOptions1(this.registerForm.phoneNumberListForParent1);
          }
        }
      }]
    }
  }
  generateNewPhoneOptions2(index: number) {
    return {
      mask: "(X00) 000-0000",
      maskRules: {"X": /[01-9]/},
      buttons: [{
        name: "trash",
        location: "after",
        options: {
          stylingMode: "text",
          icon: "trash",
          onClick: () => {
            this.registerForm.phoneNumberListForParent1.splice(index, 1);
            this.phoneOptions1 = this.getPhonesOptions1(this.registerForm.phoneNumberListForParent1);
          }
        }
      }]
    }
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
