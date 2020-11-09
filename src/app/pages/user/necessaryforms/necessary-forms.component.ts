import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../security/authentication.service';
import {Patient} from "../../../models/patient";
import {Parent} from "../../../models/parent";


@Component({
  selector: 'app-necessary-forms',
  templateUrl: './necessary-forms.component.html',
  styleUrls: ['./necessary-forms.component.scss']
})
export class NecessaryFormsComponent {

  // stepper booleans
  isPatientStepperActive:boolean = true;
  isGeneralEvaluationFormStepperActive:boolean = false;
  patientStepperClass = 'active';
  generalEvaluationFormStepperClass = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    console.log("state management---");

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

    console.log('goGeneralEvaluationForm() called');
    this.isPatientStepperActive = false;
    this.isGeneralEvaluationFormStepperActive = true;
    this.patientStepperClass = '';
    this.generalEvaluationFormStepperClass = 'active';
  }


}
