import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../security/authentication.service';
import {GeneralEvaluationForm} from '../../../models/generalevaluationform/generalevaluationform';


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


  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.generalEvaluationForm = new GeneralEvaluationForm();
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
