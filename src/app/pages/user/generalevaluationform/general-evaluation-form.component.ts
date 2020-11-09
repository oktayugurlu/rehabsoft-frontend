import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../security/authentication.service';
import {GeneralEvaluationForm} from '../../../models/generalevaluationform/generalevaluationform';
import {Patient} from "../../../models/patient";
import {Parent} from "../../../models/parent";


@Component({
  selector: 'app-general-evaluation-form',
  templateUrl: './general-evaluation-form.component.html',
  styleUrls: ['./general-evaluation-form.component.scss']
})
export class GeneralEvaluationFormComponent {
  generalEvaluationForm: GeneralEvaluationForm;
  loading = false;
  submitted = false;
  error = '';

  submitbuttonOptions:any = {useSubmitBehavior: true, text: 'Create a new account', onClick: (Event)=>this.register(Event), width: '10%',type:"default"};

  // Patient variable
  addPhoneButtonOptions1: any;
  addPhoneButtonOptions2: any;
  phoneOptions1: any[] = [];
  phoneOptions2: any[] = [];
  patientForm: any;

  // stepper booleans
  isPatientStepperActive:boolean = true;
  isGeneralEvaluationFormStepperActive:boolean = false;
  patientStepperClass = 'active';
  generalEvaluationFormStepperClass = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.patientForm = {};
    this.patientForm.parentCollection = [new Parent(), new Parent()];
    this.patientForm.phoneNumberListForParent1 = [];
    this.patientForm.phoneNumberListForParent2 = [];

    this.addPhoneButtonOptions1 = {
      icon: "add",
      text: "Add phone",
      onClick: () => {
        this.patientForm.phoneNumberListForParent1.push("");
        this.phoneOptions1 = this.getPhonesOptions1(this.patientForm.phoneNumberListForParent1);
      }
    };

    this.addPhoneButtonOptions2 = {
      icon: "add",
      text: "Add phone",
      onClick: () => {
        this.patientForm.phoneNumberListForParent2.push("");
        this.phoneOptions2 = this.getPhonesOptions2(this.patientForm.phoneNumberListForParent2);
      }
    };
  }

  ngOnInit() {
    this.generalEvaluationForm = new GeneralEvaluationForm();
    console.log("state management---");

  }

  //Patient form event handler start
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
            this.patientForm.phoneNumberListForParent1.splice(index, 1);
            this.phoneOptions1 = this.getPhonesOptions1(this.patientForm.phoneNumberListForParent1);
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
            this.patientForm.phoneNumberListForParent1.splice(index, 1);
            this.phoneOptions1 = this.getPhonesOptions1(this.patientForm.phoneNumberListForParent1);
          }
        }
      }]
    }
  }
  //Patient form event handler end


  // Stepper
  goPatientForm = () =>{
    this.isPatientStepperActive = true;
    this.isGeneralEvaluationFormStepperActive = false;
    this.patientStepperClass = 'active';
    this.generalEvaluationFormStepperClass = '';
  }
  goGeneralEvaluationForm = () =>{
    this.isPatientStepperActive = false;
    this.isGeneralEvaluationFormStepperActive = true;
    this.patientStepperClass = '';
    this.generalEvaluationFormStepperClass = 'active';
  }

  register(event) {

    // stop here if form is invalid
    if (!event.validationGroup.validate().isValid) {
      return;
    }

    this.submitted = true;


    this.loading = true;
    this.authenticationService.register(this.generalEvaluationForm)
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

}
