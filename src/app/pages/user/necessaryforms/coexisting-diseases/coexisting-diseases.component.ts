import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {AuthenticationService} from '../../../../security/authentication.service';
import {Hyperbilirubinemia} from "../../../../models/generalevaluationform/hyperbilirubinemia";
import {AfterBirthReasonCerebralPalsy} from "../../../../models/generalevaluationform/afterbirthreasoncerebralpalsy";
import {VisualImpairment} from "../../../../models/generalevaluationform/visualimpairment";
import {HearingImpairment} from "../../../../models/generalevaluationform/hearingimpairment";
import {CoexistingDiseases} from "../../../../models/generalevaluationform/coexistingdisease";


@Component({
  selector: 'app-coexisting-diseases',
  templateUrl: './coexisting-diseases.component.html',
  styleUrls: ['./coexisting-diseases.component.scss']
})
export class CoexistingDiseasesComponent {

  @Input()
  users;
  @Input()
  generalEvaluationForm:any;

  @Output() backStepper: EventEmitter<any> = new EventEmitter();
  @Output() nextStepper: EventEmitter<any> = new EventEmitter();

  nextbuttonOptions:any = {useSubmitBehavior: false, text: 'İleri', onClick: (Event)=>this.goNextForm(Event),
    width: '130px',type:"default", icon: 'fas fa-arrow-circle-right',};
  backbuttonOptions:any = {useSubmitBehavior: false, text: 'Geri', onClick: ()=>this.goBackForm(),
    icon: 'fas fa-arrow-circle-left', width: '130px',stylingMode:"outlined", type:"outlined", style:"text-align:left"};

  loading = false;

  //For selectbox
  epilepsySelectBoxList = [
    {
      name: "Yok, hiç oluşmadı ",
      value: "Yok, hiç oluşmadı "
    },{
      name: "Daha önce vardı devam etmiyor",
      value: "Daha önce vardı devam etmiyor"
    },{
      name: "Var ilaçla kontrol altında",
      value: "Var ilaçla kontrol altında"
    },{
      name: "Var ilaca dirençli",
      value: "Var ilaca dirençli"
    }];


  isVisualImpairmentList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isVisualImpairmentOption = {
    dataSource: this.isVisualImpairmentList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.visualimpairment = null;
      }
      else {
        this.generalEvaluationForm.visualimpairment = new VisualImpairment();
      }
    }
  };
  isHearingImpairmentList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isHearingImpairmentOption = {
    dataSource: this.isHearingImpairmentList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value){
        this.generalEvaluationForm.hearingImpairment = null;
      }
      else{
        this.generalEvaluationForm.hearingImpairment = new HearingImpairment();
      }
    }
  };
  isHearingAidList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isHearingAidOption = {
    dataSource: this.isHearingAidList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
    onValueChanged: (event)=>{
    }
  };


  // coexisting disease checkbox
  coexistingDiseaseMap = [
    {name: 'Bilişsel Problem', value: false},
    {name: 'Duyu Problemi', value: false},
    {name: 'Davranış Problemi',value:  false},
    {name: 'Konuşma Problemi', value: false},
    {name: 'Uyku Problemi', value: false},
    {name: 'Yutma Problemi', value: false},
    {name: 'Kalça Problemi', value: false},
    {name: 'Skolyoz', value: false}
  ];
  mentalProblemCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[0].value = event.component.option("value");
    }
  }
  hearingProblemCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[1].value = event.component.option("value");
    }
  }
  behaviorProblemCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[2].value = event.component.option("value");
    }
  }
  speakingProblemCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[3].value = event.component.option("value");
    }
  }
  sleepingProblemCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[4].value = event.component.option("value");
    }
  }
  swallowProblemCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[5].value = event.component.option("value");
    }
  }
  hipProblemCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[6].value = event.component.option("value");
    }
  }
  skolyozCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.coexistingDiseaseMap[7].value = event.component.option("value");
    }
  }

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

  }



  ngOnInit() {
    console.log("state management---");

  }

  checkIsNull = (event)=>{
    return event.value !== null;
  }

  //Patient form event handler end


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
    // let generalEvaluationFormToSendBackend = {...this.generalEvaluationForm};
    this.generalEvaluationForm.coexistingDiseasesCollection = this.generateCoexistingDiseaseCollection();
    this.nextStepper.emit();
  }
  private generateCoexistingDiseaseCollection = ():CoexistingDiseases[] =>{
    let coexistingDiseasesCollectionForField:CoexistingDiseases[] = [];
    this.coexistingDiseaseMap.forEach( isCoexistingDisease=>{
      if(isCoexistingDisease.value){
        let coexistingDisease = new CoexistingDiseases(isCoexistingDisease.name);
        coexistingDiseasesCollectionForField.push(coexistingDisease);
      }
    });

    return coexistingDiseasesCollectionForField;
  }

}
