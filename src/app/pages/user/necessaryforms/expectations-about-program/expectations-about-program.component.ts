import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {AuthenticationService} from '../../../../security/authentication.service';
import {Hyperbilirubinemia} from "../../../../models/generalevaluationform/hyperbilirubinemia";
import {AfterBirthReasonCerebralPalsy} from "../../../../models/generalevaluationform/afterbirthreasoncerebralpalsy";
import {VisualImpairment} from "../../../../models/generalevaluationform/visualimpairment";
import {HearingImpairment} from "../../../../models/generalevaluationform/hearingimpairment";
import {PhysiotherapyPast} from "../../../../models/generalevaluationform/physiotherapypast";
import {ExpectationsAboutProgram} from "../../../../models/generalevaluationform/expectationsaboutprogram";


@Component({
  selector: 'app-expectations-about-program',
  templateUrl: './expectations-about-program.component.html',
  styleUrls: ['./expectations-about-program.component.scss']
})
export class ExpectationsAboutProgramComponent {

  @Input()
  users;
  @Input()
  generalEvaluationForm:any;

  @Output() backStepper: EventEmitter<any> = new EventEmitter();
  @Output() nextStepper: EventEmitter<any> = new EventEmitter();

  nextbuttonOptions:any = {useSubmitBehavior: false, text: 'Gönder', onClick: (Event)=>this.goNextForm(Event),
    width: '130px',type:"default", icon: 'fas fa-check-circle',};
  backbuttonOptions:any = {useSubmitBehavior: false, text: 'Geri', onClick: ()=>this.goBackForm(),
    icon: 'fas fa-arrow-circle-left', width: '130px',stylingMode:"outlined", type:"outlined", style:"text-align:left"};

  loading = false;



  //--------- variables to add One-to-Many relation objects ----------//
  //*** Expectation Variables ***//
  expectationsAboutProgramOptions: any[] = [];
  addExpectationsAboutProgramButtonOptions: any = {
    icon: "add",
    text: "Ekle",
    onClick: () => {
      if(this.generalEvaluationForm.expectationsAboutProgramCollection === null) {
        this.generalEvaluationForm.expectationsAboutProgramCollection = [];
      }
      this.generalEvaluationForm.expectationsAboutProgramCollection.push(new ExpectationsAboutProgram());
      this.expectationsAboutProgramOptions = this.getExpectationsAboutProgramOptions(this.generalEvaluationForm.expectationsAboutProgramCollection);
    }
  };

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

  }



  ngOnInit() {
    console.log("state management---");

  }
  checkIsNull = (event)=>{
    return event.value !== null;
  }

  //--------- event handlers to add One-to-Many relation objects ----------//
  //******* Expectations Event Handlers start *******//
  private getExpectationsAboutProgramOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewExpectationsAboutProgramOptions1(i));
    }
    return options;
  }
  private generateNewExpectationsAboutProgramOptions1(index: number) {
    return [
      { stylingMode: 'outlined',
        placeholder: '', maxLength:1000, minHeight: 100
      },
      {
        stylingMode: "text",
        icon: "trash",
        onClick: () => {
          this.generalEvaluationForm.expectationsAboutProgramCollection.splice(index, 1);
          this.expectationsAboutProgramOptions = this.getExpectationsAboutProgramOptions(this.generalEvaluationForm.expectationsAboutProgramCollection);
        }
      }
    ];
  }
  //******* Expectations Event Handlers end *******//

  // Stepper
  goBackForm = () =>{
    this.backStepper.emit();
  }
  goNextForm = (event)=>{
    // stop here if form is invalid
    if (!event.validationGroup.validate().isValid) {
      return;
    }
    this.loading = true;
    this.nextStepper.emit();
  }

}
