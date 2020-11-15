import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../security/authentication.service";
import {GeneralEvaluationForm} from "../../../../models/generalevaluationform/generalevaluationform";
import {TokenDto} from "../../../../models/tokendto";
import {UserService} from "../../../../shared/services/user.service";
import {Patient} from "../../../../models/patient";
import {AppliedSurgery} from "../../../../models/generalevaluationform/appliedsurgery";
import {OrthesisInfo} from "../../../../models/generalevaluationform/orthesisinfo";
import {OtherOrthesisInfo} from "../../../../models/generalevaluationform/otherorthesisinfo";
import {UsedMedicine} from "../../../../models/generalevaluationform/usedmedicine";
import {CoexistingDiseases} from "../../../../models/generalevaluationform/CoexistingDisease";
import {ExpectationsAboutProgram} from "../../../../models/generalevaluationform/expectationsaboutprogram";
import {DxFileUploaderComponent, DxRadioGroupComponent} from "devextreme-angular";

@Component({
  selector: 'app-general-evaluation-form',
  templateUrl: './general-evaluation-form.component.html',
  styleUrls: ['./general-evaluation-form.component.scss']
})
export class GeneralEvaluationFormComponent implements OnInit {
  @ViewChild("eventRadioGroupMultiplePregnancy") eventRadioGroup: DxRadioGroupComponent;
  @ViewChild("dxFileUploaderComponentBotoxReport") eventBotoxReport: DxFileUploaderComponent;

  loading = false;
  error = '';
  submitted = false;
  submitbuttonOptions:any = {useSubmitBehavior: false, text: 'Gönder', onClick: (Event)=>this.register(Event),
    width: '130px',type:"default", icon: 'fas fa-check-circle',};
  backbuttonOptions:any = {useSubmitBehavior: false, text: 'Geri', onClick: ()=>this.goBackForm(),
    icon: 'fas fa-arrow-circle-left', width: '130px',stylingMode:"outlined", type:"outlined", style:"text-align:left"};
  birthDateOption = {
    stylingMode: 'outlined',
    showClearButton:"true",
    useMaskBehavior:"true",
    displayFormat:"shortdate",
    placeholder:'Uygulanma Tarihi',
    // min:"minDate",
    // max:"now",
    // value:"now",
    onValueChanged:(event)=>{},
    // disabledDates:"getDisabledDates"
  };
  lastBotoxDateOption = {
    stylingMode: 'outlined',
    showClearButton:"true",
    useMaskBehavior:"true",
    displayFormat:"shortdate",
  }


  // Forms
  generalEvaluationForm  = {
    'nameSurname': null,
    'address': null,

    // radiobutton variables for extra information in general eva. form
    isMultiplePregnancy: true,
    isApgarScoreKnown: true,
    isPregnancyInfectionInfo: true,
    isPregnancyMedicineUsageInfo: true,
    isIntensiveCare: true,

    // radiobutton variables to create new object like Hyperbilirubinemia
    isHyperbilirubinemia: true,
    isSleptHospitalForHyperbilirubinemia: true,
    isAfterBirthReasonCerebralPalsy: true,
    isBotoxTreatment: true,

    // 1. Demografik Bilgiler
    gender: null,
    birthDate: null,
    ageAsMonth: null,
    numberOfSiblings: null,
    whichChild: null,

    // 2. Fiziksel Özellikler
    heightCm: null,
    weightGr: null,
    headRoundCm:null,

    // 3. Fiziksel Özellikler
    mothersGivenBirthAgeYear: null,
    mothersEducationLevel: null,
    typeOfPregnancy: null,
    fathersEducationLevel: null,
    multiplePregnancy: null,
    isRelativeMarriage: null,
    isBloodIncompatibility: null,
    birthWeek: null,
    birthType: null,
    apgarScore: null,
    isBirthAnoxia:null,
    isBirthEmpurpling: null,
    isHighBloodPressorPregnancy: null,
    pregnancyInfectionInfo: null,
    pregnancyMedicineUsageInfo: null,
    isPregnancyDrinking: null,
    isPregnanycSmoking: null,
    oxygenSupport: null,
    id: null,
    intensiveCare: null,

    //DiseaseOfMotherPregnancy
    diseaseName: null,

    //Hyperbilirubinemia
    isPhototeraphy: null,
    hospitalDayTime: null,

    //AfterBirthReasonCerebralPalsy
    occuringMonth: null,
    cause: null,
    causeInfo: null,

    //Botox_Treatment
    lastBotoxDate: null,
    botoxRecordUrl: null,

    /*
      Many to Many ve. Many-To-Onelar buraya geecek
    */
    appliedSurgeryCollection: [],

    //One to many
    orthesisInfoCollection: [],
    otherOrthesisInfoCollection: [],
    usedMedicineCollection: [],

    //ManyToMany
    coexistingDiseasesCollection: [],

    //VisualImpairement
    information: null,

    //OneTomany

    //HearingImpairment
    isUseHearingAid: null,

    //ExpectationsAboutProgram
    expectationsAboutProgramCollection: []
  };
  currentUser: TokenDto;

  //For selectbox
  educationLevelList = [
    {
      name: "Okuryazar değil",
      value: "Okuryazar değil"
    },{
      name: "Okuryazar",
      value: "Okuryazar"
    },{
      name: "İlkokul",
      value: "İlkokul"
    },{
      name: "Ortaokul",
      value: "Ortaokul"
    },{
      name: "Yüksek Okul",
      value: "Yüksek Okul"
    },{
      name: "Lisans",
      value: "Lisans"
    },{
      name: "Lisansüstü",
      value: "Lisansüstü"
    }];
  typeOfPregnancyList = [
    {
    name: "Normal",
    value: "Normal"
    },{
      name: "Tüp Bebek",
      value: "Tüp Bebek"
    },{
      name: "Yardımcı Üreme Tekniği",
      value: "Yardımcı Üreme Tekniği"
    }];
  multiplePregnancySelectBoxList = [
    {
      name: "İkiz",
      value: "2"
    },{
      name: "Üçüz",
      value: "3"
    },{
      name: "Dördüz",
      value: "4"
    },{
      name: "Beşiz",
      value: "5"
    }];
  birthTypeSelectBoxList = [
    {
      name: "Normal vajinal ",
      value: "Normal vajinal "
    },{
      name: "Planlı sezaryen",
      value: "planlı sezaryen"
    },{
      name: "Acil sezaryen ",
      value: "Acil sezaryen "
    }];
  causesOfAfterBirthCerebralPalsyList = [
    {
      name: "Travma",
      value: "Travma"
    },{
      name: "Beyin tümörleri",
      value: "Beyin tümörleri"
    },{
      name: "Boğulma öyküsü",
      value: "Boğulma öyküsü"
    },{
      name: "Cerrahi sonrası durumlar",
      value: "Cerrahi sonrası durumlar"
    },{
      name: "Kan dolanımı",
      value: "Kan dolanımı"
    },{
      name: "Damar bozuklukları",
      value: "Damar bozuklukları"
    },{
      name: "Beyin kanamaları",
      value: "Beyin kanamaları"
    }];

  // Multiple pregnancy and others radio button
  // onIsMultiplePregnancyOptionValueChanged = (event) =>{
  //   console.log(this.generalEvaluationForm.isMultiplePregnancy);
  // }
  isMultiplePregnancyList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isMultiplePregnancyOption = {
    dataSource: this.isMultiplePregnancyList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isRelativeMarriagelist = [{name:'Var', value: true},{name:'Yok', value: false}];
  isRelativeMarriageOption = {
    dataSource: this.isRelativeMarriagelist,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isBloodIncompatibilitylist = [{name:'Var', value: true},{name:'Yok', value: false}];
  isBloodIncompatibilityOption = {
    dataSource: this.isBloodIncompatibilitylist,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isApgarScorelist = [{name:'Evet', value: true},{name:'Hayır', value: false}];
  isApgarScoreOption = {
    dataSource: this.isApgarScorelist,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isBirthAnoxialist = [{name:'Var', value: true},{name:'Yok', value: false}];
  isBirthAnoxiaOption = {
    dataSource: this.isBirthAnoxialist,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isBirthEmpurplinglist = [{name:'Var', value: true},{name:'Yok', value: false}];
  isBirthEmpurplingOption = {
    dataSource: this.isBirthEmpurplinglist,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isBirthCryinglist = [{name:'Var', value: true},{name:'Yok', value: false}];
  isBirthCryingOption = {
    dataSource: this.isBirthCryinglist,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isHighBloodPressorPregnancyList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isHighBloodPressorPregnancyOption = {
    dataSource: this.isHighBloodPressorPregnancyList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isPregnancyInfectionInfoList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isPregnancyInfectionInfoOption = {
    dataSource: this.isPregnancyInfectionInfoList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isPregnancyMedicineUsageInfoList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isPregnancyMedicineUsageInfoOption = {
    dataSource: this.isPregnancyMedicineUsageInfoList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isPregnancyDrinkingList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isPregnancyDrinkingOption = {
    dataSource: this.isPregnancyDrinkingList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isIntensiveCareList = [{name:'Kaldı', value: true},{name:'Kalmadı', value: false}];
  isIntensiveCareOption = {
    dataSource: this.isIntensiveCareList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  oxygenSupportList = [{name:'Aldı', value: true},{name:'Almadı', value: false}];
  oxygenSupportOption = {
    dataSource: this.oxygenSupportList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  newbornRetinopathyList = [{name:'Oldu', value: true},{name:'Olmadı', value: false}];
  newbornRetinopathyOption = {
    dataSource: this.newbornRetinopathyList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isRespiratuvarDistressSyndromList = [{name:'Oldu', value: true},{name:'Olmadı', value: false}];
  isRespiratuvarDistressSyndromOption = {
    dataSource: this.isRespiratuvarDistressSyndromList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isBronchopulmonaryDysplasiaList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isBronchopulmonaryDysplasiaOption = {
    dataSource: this.isBronchopulmonaryDysplasiaList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isHyperbilirubinemiaList = [{name:'Oldu', value: true},{name:'Olmadı', value: false}];
  isHyperbilirubinemiaOption = {
    dataSource: this.isHyperbilirubinemiaList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isSleptHospitalForHyperbilirubinemiaList = [{name:'Yattı', value: true},{name:'Yatmadı', value: false}];
  isSleptHospitalForHyperbilirubinemiaOption = {
    dataSource: this.isSleptHospitalForHyperbilirubinemiaList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isPhototeraphyList = [{name:'Aldı', value: true},{name:'Almadı', value: false}];
  isPhototeraphyOption = {
    dataSource: this.isPhototeraphyList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isHypoglycaemiaList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isHypoglycaemiaOption = {
    dataSource: this.isHypoglycaemiaList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isAfterBirthReasonCerebralPalsyList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isAfterBirthReasonCerebralPalsyOption = {
    dataSource: this.isAfterBirthReasonCerebralPalsyList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isBotoxTreatmentList = [{name:'Oldu', value: true},{name:'Hiç olmadı', value: false}];
  isBotoxTreatmentOption = {
    dataSource: this.isBotoxTreatmentList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };


  //--------- variables to add One-to-Many relation objects ----------//
  //*** Applied Surgeries Variables ***//
  appliedSurgeryOptions: any[] = [];
  addAppliedSurgeryButtonOptions: any = {
    icon: "add",
    text: "Cerrahi Ekle",
    onClick: () => {
      this.generalEvaluationForm.appliedSurgeryCollection.push(new AppliedSurgery());
      this.appliedSurgeryOptions = this.getAppliedSurgeryOptions(this.generalEvaluationForm.appliedSurgeryCollection);
    }
  };
  customAppliedSurgeriesList = [{
    name: 'Yumuşak doku - kas cerrahisi',
    value: 'Yumuşak doku - kas cerrahisi'
  },{
    name: 'kemik cerrahisi',
    value: 'kemik cerrahisi'
  },{
    name: 'Yumuşak doku-kas ve Kemik bir arada',
    value: 'Yumuşak doku-kas ve Kemik bir arada'
  }];


  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
    authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
      this.generalEvaluationForm['nameSurname'] = user.firstname + ' '+  user.surname;
      this.generalEvaluationForm['address'] = null;
    });
  }

  @Output() backStepper: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  register(event) {
    console.log(this.generalEvaluationForm.appliedSurgeryCollection[0].surgeryName);
    // stop here if form is invalid
    if (!event.validationGroup.validate().isValid) {
      return;
    }

    // to add correspond fied into patient
    this.fillPatientAddress();


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

  //--------- event handlers to add One-to-Many relation objects ----------//

  //******* Applied Surgery Event Handlers start *******//
  getAppliedSurgeryOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewAppliedSurgeryOptions1(i));
    }
    return options;
  }
  generateNewAppliedSurgeryOptions1(index: number) {
    return [
      { stylingMode: 'outlined',
        placeholder: 'Seçiniz, yoksa yazınız...',
        dataSource: this.customAppliedSurgeriesList,
        acceptCustomValue: true,
        valueExpr: 'value',
        displayExpr: 'name',
        onCustomItemCreating: this.onCustomItemCreatingForAppliedSurgerySelectbox
      },
      {
        placeholder: 'Uygulanma Tarihi'
      },
      {
        stylingMode: "text",
        icon: "trash",
        onClick: () => {
          this.generalEvaluationForm.appliedSurgeryCollection.splice(index, 1);
          this.appliedSurgeryOptions = this.getAppliedSurgeryOptions(this.generalEvaluationForm.appliedSurgeryCollection);
        }
    }
      ];
  }
  onCustomItemCreatingForAppliedSurgerySelectbox = (event)=>{
    const newItem = {
      name: event.text,
      value: event.text
    };
    // this.customAppliedSurgeriesList.push(newItem);
    event.customItem = newItem;
    console.log(event.customItem);
  }
  //******* Applied Surgery Event Handlers end *******//

  private fillPatientAddress = ()=>{
    let newPatient;
    this.userService.patient.subscribe(patient=>{
      newPatient = {...patient};
      newPatient.address = this.generalEvaluationForm.address;
    });
  }

  goBackForm = () =>{
    this.backStepper.emit();;
  }

  //validation rules
  checkIsNull = (event)=>{
    return event.value !== null;
  }

  // image uploader
  uploadBotoxReport = (event) => {
    console.log(event.value);
  }
  uploadAppliedsSuergeryEpicrysisImage = (event) => {
    console.log(event.value);
  }


}
