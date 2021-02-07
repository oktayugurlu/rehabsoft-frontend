import { CommonModule } from '@angular/common';
import {Component, Input, NgModule} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../security/authentication.service';
import {Patient} from "../../../models/patient";
import {Parent} from "../../../models/parent";
import {OrthesisInfo} from "../../../models/generalevaluationform/orthesisinfo";
import {CoexistingDiseases} from "../../../models/generalevaluationform/coexistingdisease";
import {PhysiotherapyPast} from "../../../models/generalevaluationform/physiotherapypast";
import {PhysiotheraphyCentral} from "../../../models/generalevaluationform/physiotheraphycentral";
import {UserService} from "../../../shared/services/user.service";

import swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-necessary-forms',
  templateUrl: './necessary-forms.component.html',
  styleUrls: ['./necessary-forms.component.scss']
})
export class NecessaryFormsComponent {

  @Input()
  users;
  submitted = false;

  // stepper booleans map
  stepperActiveBooleans = {
    "isPatientStepperActive": true,
    "isDemographicFeaturesStepperActive": false,
    "isPhysicalAppearanceStepperActive": false,
    "isPrenatalFeaturesStepperActive": false,
    "isBirthFeaturesStepperActive": false,
    "isAfterBirthFeaturesStepperActive": false,
    "isAfterBirthCerebralPalsyReasonsStepperActive": false,
    "isAppliedTreatmentsStepperActive": false,
    "isCoexistingDiseasesStepperActive": false,
    "isPhysiotherapyPastStepperActive": false,
    "isExpectationsAboutProgramStepperActive": false,
  };

  stepperClassesMap = {
    "patientStepperClass": 'active',
    "demographicFeaturesStepperClass": '',
    "physicalAppearanceFormStepperClass": '',
    "prenatalFeaturesFormStepperClass": '',
    "birthFeaturesFormStepperClass": '',
    "afterBirthFeaturesFormStepperClass": '',
    "afterBirthCerebralPalsyReasonsFormStepperClass": '',
    "appliedTreatmentsFormStepperClass": '',
    "physiotherapyPastFormStepperClass": '',
    "expectationsAboutProgramFormStepperClass": ''
  }

  // Stepper
  goPatientForm = () =>{
    this.setAllFormAttributesFalseExpectThese("isPatientStepperActive", "patientStepperClass");
  }
  goDemographicFeatures = () =>{
    this.setAllFormAttributesFalseExpectThese("isDemographicFeaturesStepperActive", "demographicFeaturesStepperClass");
  }
  goPhysicalAppearance = () =>{
    this.setAllFormAttributesFalseExpectThese("isPhysicalAppearanceStepperActive", "physicalAppearanceFormStepperClass");
  }
  goPrenatalFeatures = () =>{
    this.setAllFormAttributesFalseExpectThese("isPrenatalFeaturesStepperActive", "prenatalFeaturesFormStepperClass");
  }
  goBirthFeatures = () =>{
    this.setAllFormAttributesFalseExpectThese("isBirthFeaturesStepperActive", "birthFeaturesFormStepperClass");
  }
  goAfterBirthFeatures = () =>{
    this.setAllFormAttributesFalseExpectThese("isAfterBirthFeaturesStepperActive", "afterBirthFeaturesFormStepperClass");
  }
  goAfterBirthCerebralPalsyReasons = () =>{
    this.setAllFormAttributesFalseExpectThese("isAfterBirthCerebralPalsyReasonsStepperActive", "afterBirthCerebralPalsyReasonsFormStepperClass");
  }
  goAppliedTreatments = () =>{
    this.setAllFormAttributesFalseExpectThese("isAppliedTreatmentsStepperActive", "appliedTreatmentsFormStepperClass");
  }
  goCoexistingDiseases = () =>{
    this.setAllFormAttributesFalseExpectThese("isCoexistingDiseasesStepperActive", "coexistingDiseasesFormStepperClass");
  }
  goPhysiotherapyPast = () =>{
    this.setAllFormAttributesFalseExpectThese("isPhysiotherapyPastStepperActive", "physiotherapyPastFormStepperClass");
  }
  goExpectationsAboutProgram = () =>{
    this.setAllFormAttributesFalseExpectThese("isExpectationsAboutProgramStepperActive", "expectationsAboutProgramFormStepperClass");
  }

  private setAllFormAttributesFalseExpectThese(expectThisStepperActiveAttribute:string, expectThisFormStepperClass:string){
    Object.keys(this.stepperActiveBooleans).forEach(key=>{
      if(expectThisStepperActiveAttribute===key){
        this.stepperActiveBooleans[expectThisStepperActiveAttribute]=true;
      } else{
        this.stepperActiveBooleans[key]=false;
      }
    });

    Object.keys(this.stepperClassesMap).forEach(key=>{
      if(expectThisFormStepperClass===key){
        this.stepperClassesMap[expectThisFormStepperClass]='active';
      } else{
        this.stepperClassesMap[key]='';
      }
    });
  }


  // Forms
  generalEvaluationForm  = {
    'nameSurname': null,
    'address': null,

    // radiobutton variables for extra information in general eva. form. page to make visible some content on html
    // Hepsini null giricez daha sonra
    isMultiplePregnancy: false,
    isApgarScoreKnown: false,
    isPregnancyInfectionInfo: false,
    isPregnancyMedicineUsageInfo: false,
    isIntensiveCare: false,
    isVisualImpairment: false,
    isHearingImpairment: false,

    // radiobutton variables to create new object like Hyperbilirubinemia to save in Collection
    isHyperbilirubinemia: false,
    isSleptHospitalForHyperbilirubinemia: false,
    isAfterBirthReasonCerebralPalsy: false,
    isBotoxTreatment: false,
    isPhysiotherapyPast: false,

    // orthesis variables, should be deleted and reformatted before submit
    isOrthesisMap: null,
    orthesisMap: null,

    // for selected cause of after birth cerebral parcy. bir sebep secilirse ona ozel aciklama itemi olusuyor. onu visible yapmak icin.
    isTraumaVisible: false,
    isBrainTumour: false,
    isAfterSurgerySituation: false,
    isBloodCirculation: false,
    isBrainBleedingOrBloodCirculationOrVascularDisorder: false,

    // 1. Demografik Bilgiler
    gender: null,
    birthDate: null,
    ageAsMonth: null,
    numberOfSiblings: null,
    whichChild: null,

    // 2. Fiziksel Özellikler
    heightCm: null,
    weightGr: null,
    headRoundCm: null,

    // 3. Dogum Oncesi Ozellikler
    mothersGivenBirthAgeYear: null,
    mothersEducationLevel: null,
    typeOfPregnancy: null,
    fathersEducationLevel: null,
    multiplePregnancy: null,
    isRelativeMarriage: null,
    isBloodIncompatibility: null,

    // 4. Dogum Ozellikler
    birthWeek: null,
    birthType: null,
    birthWeight: null,
    birthHeadAroundCm: null,
    apgarScore: null,
    isBirthAnoxia: null,
    isBirthEmpurpling: null,
    isBirthCrying: null,
    isHighBloodPressorPregnancy: null,
    pregnancyInfectionInfo:null,
    pregnancyMedicineUsageInfo: null,
    isPregnancyDrinking: null,
    isPregnanycSmoking:null,
    id:null,

    // 5.Doğum Sonrası Özellikler
    oxygenSupport: null,
    intensiveCare:null,
    isNewbornRetinopathy: null,
    isRespiratuvarDistressSyndrom: null,
    isBronchopulmonaryDysplasia: null,
    isHypoglycaemia: null,

    //DiseaseOfMotherPregnancy
    diseaseOfMotherPregnancy: null,

    //Hyperbilirubinemia
    hyperbilirubinemia: null,

    //AfterBirthReasonCerebralPalsy
    afterBirthReasonCerebralPalsy: null,

    //Botox_Treatment
    botoxTreatment: null,

    /*
      Many to Many ve.þ Many-To-Onelar buraya geecek
    */
    appliedSurgeryCollection: null,

    //One to many
    orthesisInfoCollection: [],
    otherOrthesisInfoCollection: null,
    usedMedicineCollection: null,

    //ManyToMany
    coexistingDiseasesCollection: null,

    //VisualImpairement
    visualimpairment: null,

    //OneTomany

    //HearingImpairment
    hearingImpairment: null,

    //ExpectationsAboutProgram
    expectationsAboutProgramCollection: [],

    //Epilepsy
    epilepsy: null,

    //Physioterapy Past
    physiotherapyPast: null
  };

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    authenticationService.currentUser.subscribe(user=>{
      this.generalEvaluationForm['nameSurname'] = user.firstname + ' '+  user.surname;
      this.generalEvaluationForm['address'] = null;
    });
  }

  ngOnInit() {
    console.log("state management---");

  }


  //Patient form event handler end



  // Submit Button
  submit() {

  console.log("submit basladi general form: ",this.generalEvaluationForm);

  //******* codes to test start*******//

  // this.generalEvaluationForm.birthDate = this.generalEvaluationForm.birthDate.toISOString().replace('T',' ').slice(0,-5);
  // console.log("date: ", this.generalEvaluationForm );
  // this.userService.postGeneralEvaluationForm(this.generalEvaluationForm)
  //   .pipe(first())
  //   .subscribe(
  //     data => {
  //       this.router.navigate(['/user/home']);
  //     },
  //     error => {
  //       console.log(error)
  //       this.error = error;
  //       this.loading = false;
  //     });

  //******* codes to test start*******//

  // to add correspond fied into patient and general evaluation form


  console.log();
  let generalEvaluationFormToSendBackend = {...this.generalEvaluationForm};
  this.cleanGeneralEvaluationFormFromBoolean(generalEvaluationFormToSendBackend);

  //change date values to remove ISO
  this.preparingDatesForBackend(generalEvaluationFormToSendBackend);

  this.submitted = true;

  //post general evaluation form and patient
  console.log("tam submit oncesi: ",generalEvaluationFormToSendBackend);

  let patient = {...this.userService.getPatient};
  patient.address =  generalEvaluationFormToSendBackend.address;
  console.log("patient",patient);
  delete generalEvaluationFormToSendBackend.address;

  this.userService.postPatient(patient)
    .pipe(first())
    .subscribe(
      patientData => {
        this.userService.postGeneralEvaluationForm(generalEvaluationFormToSendBackend)
          .pipe(first())
          .subscribe(
            data => {
              // notify(JSON.stringify(data.responseMessage));

              // message is ok
              const options = {
                title: 'Başarılı !',
                icon: 'success',
                text: 'Form Başarılı Bir Şekilde Kaydedildi! ',
                type: 'success',
                heightAuto: false
              } as SweetAlertOptions;
              this.router.navigate(['/user/home']).then((message)=>{
                swal.fire(options).then(() => {
                });
              });

            },
            error => {
              notify(JSON.stringify(error.responseMessage));
            });
      },
      error => {
        notify(JSON.stringify(error));
      }
    )

  }
  preparingDatesForBackend= (generalEvaluationFormToSendBackend:any) => {
    generalEvaluationFormToSendBackend.birthDate = generalEvaluationFormToSendBackend.birthDate.toISOString().replace('T',' ').slice(0,-5);

    if(generalEvaluationFormToSendBackend.botoxTreatment !==null){
      generalEvaluationFormToSendBackend.botoxTreatment.lastBotoxDate = generalEvaluationFormToSendBackend.botoxTreatment.lastBotoxDate.toISOString().replace('T',' ').slice(0,-5);
    }
    if(generalEvaluationFormToSendBackend.appliedSurgeryCollection !==null)
      generalEvaluationFormToSendBackend.appliedSurgeryCollection.forEach((appliedSurgery,index)=>{
        generalEvaluationFormToSendBackend.appliedSurgeryCollection[index].applyingDate = appliedSurgery.applyingDate.toISOString().replace('T',' ').slice(0,-5);
      });
  }

  cleanGeneralEvaluationFormFromBoolean = (generalEvaluationFormToSendBackend:any) =>{

    delete generalEvaluationFormToSendBackend.isOrthesisMap;
    delete generalEvaluationFormToSendBackend.orthesisMap;
    delete generalEvaluationFormToSendBackend.isPhysiotherapyPast;

    delete generalEvaluationFormToSendBackend.isMultiplePregnancy;
    delete generalEvaluationFormToSendBackend.isApgarScoreKnown;
    delete generalEvaluationFormToSendBackend.isPregnancyInfectionInfo;
    delete generalEvaluationFormToSendBackend.isPregnancyMedicineUsageInfo;
    delete generalEvaluationFormToSendBackend.isIntensiveCare;
    delete generalEvaluationFormToSendBackend.isVisualImpairment;
    delete generalEvaluationFormToSendBackend.isHearingImpairment;
    delete generalEvaluationFormToSendBackend.isHyperbilirubinemia;
    delete generalEvaluationFormToSendBackend.isSleptHospitalForHyperbilirubinemia;
    delete generalEvaluationFormToSendBackend.isAfterBirthReasonCerebralPalsy;
    delete generalEvaluationFormToSendBackend.isBotoxTreatment;
    delete generalEvaluationFormToSendBackend.isPhysiotherapyPast;
    delete generalEvaluationFormToSendBackend.isTraumaVisible;
    delete generalEvaluationFormToSendBackend.isBrainTumour;
    delete generalEvaluationFormToSendBackend.isAfterSurgerySituation;
    delete generalEvaluationFormToSendBackend.isBloodCirculation;
    delete generalEvaluationFormToSendBackend.isBrainBleedingOrBloodCirculationOrVascularDisorder;
    delete generalEvaluationFormToSendBackend.isPhysiotherapyPast;
    delete generalEvaluationFormToSendBackend.isPhysiotherapyPast;
    delete generalEvaluationFormToSendBackend.nameSurname;
  }

}
