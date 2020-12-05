import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../security/authentication.service";
import {TokenDto} from "../../../../models/tokendto";
import {UserService} from "../../../../shared/services/user.service";
import {AppliedSurgery} from "../../../../models/generalevaluationform/appliedsurgery";
import {OrthesisInfo} from "../../../../models/generalevaluationform/orthesisinfo";
import {OtherOrthesisInfo} from "../../../../models/generalevaluationform/otherorthesisinfo";
import {UsedMedicine} from "../../../../models/generalevaluationform/usedmedicine";
import {CoexistingDiseases} from "../../../../models/generalevaluationform/coexistingdisease";
import {ExpectationsAboutProgram} from "../../../../models/generalevaluationform/expectationsaboutprogram";
import {DxFileUploaderComponent, DxRadioGroupComponent} from "devextreme-angular";
import {Hyperbilirubinemia} from "../../../../models/generalevaluationform/hyperbilirubinemia";
import {AfterBirthReasonCerebralPalsy} from "../../../../models/generalevaluationform/afterbirthreasoncerebralpalsy";
import {VisualImpairment} from "../../../../models/generalevaluationform/visualimpairment";
import {HearingImpairment} from "../../../../models/generalevaluationform/hearingimpairment";
import {PhysiotherapyPast} from "../../../../models/generalevaluationform/physiotherapypast";
import {PhysiotheraphyCentral} from "../../../../models/generalevaluationform/physiotheraphycentral";
import notify from "devextreme/ui/notify";
import {Patient} from "../../../../models/patient";
import swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-general-evaluation-form',
  templateUrl: './general-evaluation-form.component.html',
  styleUrls: ['./general-evaluation-form.component.scss']
})
export class GeneralEvaluationFormComponent implements OnInit {
  @ViewChild("eventRadioGroupMultiplePregnancy") eventRadioGroup: DxRadioGroupComponent;
  @ViewChild("dxFileUploaderComponentBotoxReport") eventBotoxReport: DxFileUploaderComponent;

  appliedSurgeriesFiles:File[]=[];

  loading = false;
  error = '';
  submitted = false;
  submitbuttonOptions:any = {useSubmitBehavior: false, text: 'Gönder', onClick: (Event)=>this.submit(Event),
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
    onValueChanged: (event)=>{
      console.log(this.generalEvaluationForm.birthDate);
    }
    // disabledDates:"getDisabledDates"
  };
  lastBotoxDateOption = {
    stylingMode: 'outlined',
    showClearButton:"true",
    useMaskBehavior:"true",
    displayFormat:"shortdate",
    onValueChanged:(event)=>{
    }
  }

  ////************** For 2 Collections in GeneralEvaluationForm bunlar sonra submitte tek tek kontrol edilip oyle collectionlarina set edilecek****************/////
  // Orthesis checkbox options
  isOrthesisMap = [
    {name: 'Tabanlık', value: false},
    {name: 'Topuk Kapı', value: false},
    {name: 'Ayak bileği hizasında ortez (supra-malleoler)',value:  false},
    {name: 'Sabit Ayak-ayak bileği ortezi (AFO)', value: false},
    {name: 'Eklemli Ayak-ayak bileği ortezi (eklemli AFO)', value: false},
    {name: 'Eklemli Ayak-ayak bileği ortezi (eklemli AFO)', value: false},
    {name: 'Dinamik ayak ayak bileği ortezi (DAFO)', value: false},
    {name: 'Bacaklar için gece splinti', value: false},
    {name: 'Bacaklar için gece splinti',value:  false},
    {name: 'İmmobilizer', value: false},
    {name: 'Kalça ateli', value: false},
    {name: 'Gövde korsesi', value: false},
    {name: 'Dirsek splinti', value: false},
    {name: 'Baş parmak ortezi', value: false},
  ];
  orthesisMap = new Map([
    ['Tabanlık', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Topuk Kapı', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Ayak bileği hizasında ortez (supra-malleoler)', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Sabit Ayak-ayak bileği ortezi (AFO)', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Eklemli Ayak-ayak bileği ortezi (eklemli AFO)', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Dinamik ayak ayak bileği ortezi (DAFO)', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Bacaklar için gece splinti', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['İmmobilizer', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Kalça ateli', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Gövde korsesi', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Dirsek splinti', new Map([
      ['left', false],
      ['right', false]
    ])],
    ['Baş parmak ortezi', new Map([
      ['left', false],
      ['right', false]
    ])]
  ]);
  checkIsFalseBothLeftAndRightForValidation = (event)=>{
    // console.log(event.formItem.label.text);
    // console.log((this.orthesisMap.get(event.formItem.label.text).get('left')===true && this.orthesisMap.get(event.formItem.label.text).get('right')==false)
    //   || (!this.orthesisMap.get(event.formItem.label.text).get('left')===false && this.orthesisMap.get(event.formItem.label.text).get('right')==true));
    //
    // return (this.orthesisMap.get(event.formItem.label.text).get('left') && !this.orthesisMap.get(event.formItem.label.text).get('right'))
    //   || (!this.orthesisMap.get(event.formItem.label.text).get('left') && this.orthesisMap.get(event.formItem.label.text).get('right'));
    return true;
  }

  orthesisTabanlikCheckBoxOptions = {
    value: null,
    onValueChanged: (e) => {
      this.isOrthesisMap[0].value = e.component.option("value");
    }
  }
  leftTabanlikCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Tabanlık', this.orthesisMap.get('Tabanlık').set('left',event.value));
    },
    text:"Sol taban"
  }
  rightTabanlikOrthesisCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Tabanlık', this.orthesisMap.get('Tabanlık').set('right',event.value));
    },
    text:"Sağ taban"
  }
  /////
  orthesisTopukKapiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[1].value = event.component.option("value");
    }
  }
  leftOrthesisTopukKapiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Topuk Kapı', this.orthesisMap.get('Topuk Kapı').set('left',event.value));
    },
    text:"Sol topuk"
  }
  rightOrthesisTopukKapiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Topuk Kapı', this.orthesisMap.get('Topuk Kapı').set('right',event.value));
    },
    text:"Sağ topuk"
  }
  /////
  /////
  orthesisAyakBilegiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[2].value = event.component.option("value");
    },
    width:22
  }
  leftOrthesisAyakBilegiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Ayak bileği hizasında ortez (supra-malleoler)', this.orthesisMap.get('Ayak bileği hizasında ortez (supra-malleoler)').set('left',event.value));
    },
    text:"Sol ayak bileği"
  }
  rightOrthesisAyakBilegiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Ayak bileği hizasında ortez (supra-malleoler)', this.orthesisMap.get('Ayak bileği hizasında ortez (supra-malleoler)').set('right',event.value));
    },
    text:"Sağ ayak bileği"
  }/////
  orthesisSabitAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[3].value = event.component.option("value");
    }
  }
  leftOrthesisSabitAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Sabit Ayak-ayak bileği ortezi (AFO)', this.orthesisMap.get('Sabit Ayak-ayak bileği ortezi (AFO)').set('left',event.value));
    },
    text:"Sol Ayak"
  }
  rightOrthesisSabitAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Sabit Ayak-ayak bileği ortezi (AFO)', this.orthesisMap.get('Sabit Ayak-ayak bileği ortezi (AFO)').set('right',event.value));
    },
    text:"Sağ Ayak"
  }/////
  orthesisEklemliAyakCheckBoxOptions = {
    onValueChanged: (event)=>{
      this.isOrthesisMap[4].value = event.component.option("value");
    }
  }
  leftOrthesisEklemliAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Eklemli Ayak-ayak bileği ortezi (eklemli AFO)', this.orthesisMap.get('Eklemli Ayak-ayak bileği ortezi (eklemli AFO)').set('left',event.value));
    },
    text:"Sol Ayak"
  }
  rightOrthesisEklemliAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Eklemli Ayak-ayak bileği ortezi (eklemli AFO)', this.orthesisMap.get('Eklemli Ayak-ayak bileği ortezi (eklemli AFO)').set('right',event.value));
    },
    text:"Sağ Ayak"
  }/////
  orthesisDinamikAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[5].value = event.component.option("value");
    }
  }
  leftOrthesisDinamikAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Dinamik ayak ayak bileği ortezi (DAFO)', this.orthesisMap.get('Dinamik ayak ayak bileği ortezi (DAFO)').set('left',event.value));
    },
    text:"Sol Ayak"
  }
  rightOrthesisDinamikAyakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Dinamik ayak ayak bileği ortezi (DAFO)', this.orthesisMap.get('Dinamik ayak ayak bileği ortezi (DAFO)').set('right',event.value));
    },
    text:"Sağ Ayak"
  }/////
  orthesisBacakGeceCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[6].value = event.component.option("value");
    }
  }
  leftOrthesisBacakGeceCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Bacaklar için gece splinti', this.orthesisMap.get('Bacaklar için gece splinti').set('left',event.value));
    },
    text:"Sol Bacak"
  }
  rightOrthesisBacakGeceCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Bacaklar için gece splinti', this.orthesisMap.get('Bacaklar için gece splinti').set('right',event.value));
    },
    text:"Sağ Bacak"
  }/////
  orthesisImmobilizerCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[7].value = event.component.option("value");
    }
  }
  leftOrthesisImmobilizerCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('İmmobilizer', this.orthesisMap.get('İmmobilizer').set('left',event.value));
    },
    text:"Sol Omuz"
  }
  rightOrthesisImmobilizerCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('İmmobilizer', this.orthesisMap.get('İmmobilizer').set('right',event.value));
    },
    text:"Sağ Omuz"
  }
/////
  orthesisKalcaAteliCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[8].value = event.component.option("value");
    }
  }
  // leftOrthesisKalcaAteliCheckBoxOptions = {
  //   value: null,
  //   onValueChanged: (event)=>{
  //     this.orthesisMap.set('Kalça ateli', this.orthesisMap.get('Kalça ateli').set('left',event.value));
  //   },
  //   text:"Sağ bacak"
  // }
  // rightOrthesisKalcaAteliCheckBoxOptions = {
  //   value: null,
  //   onValueChanged: (event)=>{
  //     this.orthesisMap.set('Kalça ateli', this.orthesisMap.get('Kalça ateli').set('right',event.value));
  //   }
  // }/////
  orthesisGovdeKorsesiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[9].value = event.component.option("value");
    }
  }
  // leftOrthesisGovdeKorsesiCheckBoxOptions = {
  //   value: null,
  //   onValueChanged: (event)=>{
  //     this.orthesisMap.set('Gövde korsesi', this.orthesisMap.get('Gövde korsesi').set('left',event.value));
  //   }
  // }
  // rightOrthesisGovdeKorsesiCheckBoxOptions = {
  //   value: null,
  //   onValueChanged: (event)=>{
  //     this.orthesisMap.set('Gövde korsesi', this.orthesisMap.get('Gövde korsesi').set('right',event.value));
  //   }
  // }/////
  orthesisDirsekSiplintiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[10].value = event.component.option("value");
    }
  }
  leftOrthesisDirsekSiplintiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Dirsek splinti', this.orthesisMap.get('Dirsek splinti').set('left',event.value));
    },
    text:"Sağ Dirsek"
  }
  rightOrthesisDirsekSiplintiCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Dirsek splinti', this.orthesisMap.get('Dirsek splinti').set('right',event.value));
    },
    text:"Sol Dirsek"
  }/////
  orthesisBasParmakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.isOrthesisMap[11].value = event.component.option("value");
    }
  }
  leftOrthesisBasParmakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Baş parmak ortezi', this.orthesisMap.get('Baş parmak ortezi').set('left',event.value));
    },
    text:"Sol Parmak"
  }
  rightOrthesisBasParmakCheckBoxOptions = {
    value: null,
    onValueChanged: (event)=>{
      this.orthesisMap.set('Baş parmak ortezi', this.orthesisMap.get('Baş parmak ortezi').set('right',event.value));
    },
    text:"Sağ Parmak"
  }

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

  /// PhysiotherapyCenter in PhysiotherapyPast
  physiotherapyCenterMap = [
    {name: 'Özel eğitim ve rehabilitasyon merkezi', value: false},
    {name: 'Tıp merkezi-hastane', value: false},
  ];
  specialEducationCheckBoxOptions = {
    value: null,
    text: 'Özel eğitim ve rehabilitasyon merkezi',
    onValueChanged: (event)=>{
      this.physiotherapyCenterMap[0].value = event.component.option("value");
    }
  }
  medicineCenterCheckBoxOptions = {
    value: null,
    text: 'Tıp merkezi-hastane',
    onValueChanged: (event)=>{
      this.physiotherapyCenterMap[1].value = event.component.option("value");
    }
  }

  ////************** For 2 Collections in GeneralEvaluationForm and 1 collection in field end ****************/////


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
    isOrthesisMap: this.isOrthesisMap,
    orthesisMap: this.orthesisMap,

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
      value: 2
    },{
      name: "Üçüz",
      value: 3
    },{
      name: "Dördüz",
      value: 4
    },{
      name: "Beşiz",
      value: 5
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
  genderSelectBoxList= [
    {
      name: "Erkek",
      value: "Erkek"
    },{
      name: "Kız",
      value: "Kız"
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
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.multiplePregnancy = null;
      }
    }
  };
  isRelativeMarriagelist = [{name:'Var', value: true},{name:'Yok', value: false}];
  isRelativeMarriageOption = {
    dataSource: this.isRelativeMarriagelist,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
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
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.apgarScore = 0;
      }

    }
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
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value){
        this.generalEvaluationForm.pregnancyInfectionInfo = null;
      }
    }
  };
  isPregnancyMedicineUsageInfoList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isPregnancyMedicineUsageInfoOption = {
    dataSource: this.isPregnancyMedicineUsageInfoList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.pregnancyMedicineUsageInfo = null;
      }
      else {
        this.generalEvaluationForm.pregnancyMedicineUsageInfo = "";
      }
    }
  };
  isPregnancyDrinkingList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isPregnancyDrinkingOption = {
    dataSource: this.isPregnancyDrinkingList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isPregnancySmokingList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isPregnancySmokingOption = {
    dataSource: this.isPregnancySmokingList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
  isIntensiveCareList = [{name:'Kaldı', value: true},{name:'Kalmadı', value: false}];
  isIntensiveCareOption = {
    dataSource: this.isIntensiveCareList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.intensiveCare = 0;
      }
    }
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
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.hyperbilirubinemia = null;
      }
      else{
        this.generalEvaluationForm.hyperbilirubinemia = new Hyperbilirubinemia();
      }
    }
  };
  isSleptHospitalForHyperbilirubinemiaList = [{name:'Yattı', value: true},{name:'Yatmadı', value: false}];
  isSleptHospitalForHyperbilirubinemiaOption = {
    dataSource: this.isSleptHospitalForHyperbilirubinemiaList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        if( this.generalEvaluationForm.hyperbilirubinemia !==null){
          this.generalEvaluationForm.hyperbilirubinemia.isPhototeraphy = null;
          this.generalEvaluationForm.hyperbilirubinemia.hospitalDayTime = null;
        }
      }
      else{
        this.generalEvaluationForm.hyperbilirubinemia = new Hyperbilirubinemia();
      }
    }
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
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.afterBirthReasonCerebralPalsy = null;
      }
      else {
        this.generalEvaluationForm.afterBirthReasonCerebralPalsy = new AfterBirthReasonCerebralPalsy();
      }
    }
  };
  isBotoxTreatmentList = [{name:'Oldu', value: true},{name:'Hiç olmadı', value: false}];
  isBotoxTreatmentOption = {
    dataSource: this.isBotoxTreatmentList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };
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
  isPhysiotherapyPastList = [{name:'Var', value: true},{name:'Yok', value: false}];
  isPhysiotherapyPastOption = {
    dataSource: this.isPhysiotherapyPastList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name',
    onValueChanged: (event)=>{
      if(!event.value) {
        this.generalEvaluationForm.physiotherapyPast = null;
      }
      else {
        this.generalEvaluationForm.physiotherapyPast = new PhysiotherapyPast();
      }
    }
  };


  //--------- variables to add One-to-Many relation objects ----------//
  //*** Applied Surgeries Variables ***//
  appliedSurgeryOptions: any[] = [];
  addAppliedSurgeryButtonOptions: any = {
    icon: "add",
    text: "Cerrahi Ekle",
    onClick: () => {
      if(this.generalEvaluationForm.appliedSurgeryCollection === null) {
        this.generalEvaluationForm.appliedSurgeryCollection = [];
      }
      this.generalEvaluationForm.appliedSurgeryCollection.push(new AppliedSurgery());
      this.appliedSurgeryOptions = this.getAppliedSurgeryOptions(this.generalEvaluationForm.appliedSurgeryCollection);
    }
  };
  customAppliedSurgeriesList = [{
    name: 'Yumuşak doku - kas cerrahisi',
    value: 'Yumuşak doku - kas cerrahisi'
  },{
    name: 'Kemik cerrahisi',
    value: 'Kemik cerrahisi'
  },{
    name: 'Yumuşak doku-kas ve Kemik bir arada',
    value: 'Yumuşak doku-kas ve Kemik bir arada'
  }];

  //*** Other Orthesis Variables ***//
  otherOrthesisOptions: any[] = [];
  addOtherOrthesisButtonOptions: any = {
    icon: "add",
    text: "Ekle",
    onClick: () => {
      if(this.generalEvaluationForm.otherOrthesisInfoCollection === null) {
        this.generalEvaluationForm.otherOrthesisInfoCollection = [];
      }
      this.generalEvaluationForm.otherOrthesisInfoCollection.push(new OtherOrthesisInfo());
      this.otherOrthesisOptions = this.getOtherOrthesisOptions(this.generalEvaluationForm.otherOrthesisInfoCollection);
    }
  };

  //*** Used Medicine Variables ***//
  usedMedicineOptions: any[] = [];
  addUsedMedicineButtonOptions: any = {
    icon: "add",
    text: "İlaç Ekle",
    onClick: () => {
      if(this.generalEvaluationForm.usedMedicineCollection === null) {
        this.generalEvaluationForm.usedMedicineCollection = [];
      }
      this.generalEvaluationForm.usedMedicineCollection.push(new UsedMedicine());
      this.usedMedicineOptions = this.getUsedMedicineOptions(this.generalEvaluationForm.usedMedicineCollection);
    }
  };


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
              private userService: UserService,
              private authenticationService: AuthenticationService) {
    authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
      this.generalEvaluationForm['nameSurname'] = user.firstname + ' '+  user.surname;
      this.generalEvaluationForm['address'] = null;
    });
    this.userService.patient.subscribe(patient=>{
      console.log("patientpatient",patient);
    });
  }

  @Output() backStepper: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  submit(event) {

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

    // stop here if form is invalid
    if (!event.validationGroup.validate().isValid) {
      return;
    }

    // to add correspond fied into patient and general evaluation form
    let generalEvaluationFormToSendBackend = {...this.generalEvaluationForm};
    generalEvaluationFormToSendBackend.orthesisInfoCollection = this.generateOrthesisCollection(generalEvaluationFormToSendBackend);
    generalEvaluationFormToSendBackend.coexistingDiseasesCollection = this.generateCoexistingDiseaseCollection();
    generalEvaluationFormToSendBackend.physiotherapyPast = this.generatePhysioteraphyPast(generalEvaluationFormToSendBackend);
    console.log();
    this.cleanGeneralEvaluationFormFromBoolean(generalEvaluationFormToSendBackend);

    //change date values to remove ISO
    this.preparingDatesForBackend(generalEvaluationFormToSendBackend);


    this.submitted = true;
    this.loading = true;

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
                this.error = error;
                this.loading = false;
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

  generateOrthesisCollection = (generalEvaluationFormToSendBackend:any):OrthesisInfo[] =>{
    let orthesisCollectionForField: OrthesisInfo[] = [];
    generalEvaluationFormToSendBackend.isOrthesisMap.forEach( isOrthesis=>{
      if(isOrthesis.value){
        let orthesisInfo = new OrthesisInfo(this.orthesisMap.get(isOrthesis.name).get("left"),
          this.orthesisMap.get(isOrthesis.name).get("right"), isOrthesis.name);
        orthesisCollectionForField.push(orthesisInfo);
      }
    });
    delete generalEvaluationFormToSendBackend.isOrthesisMap;
    delete generalEvaluationFormToSendBackend.orthesisMap;
    return orthesisCollectionForField;
  }

  generateCoexistingDiseaseCollection = ():CoexistingDiseases[] =>{
    let coexistingDiseasesCollectionForField:CoexistingDiseases[] = [];
    this.coexistingDiseaseMap.forEach( isCoexistingDisease=>{
      if(isCoexistingDisease.value){
        let coexistingDisease = new CoexistingDiseases(isCoexistingDisease.name);
        coexistingDiseasesCollectionForField.push(coexistingDisease);
      }
    });

    return coexistingDiseasesCollectionForField;
  }

  generatePhysioteraphyPast = (generalEvaluationFormToSendBackend:any):PhysiotherapyPast => {
    let physiotherapyPasts:PhysiotherapyPast = {...generalEvaluationFormToSendBackend.physiotherapyPast};
    physiotherapyPasts.physiotheraphyCentralCollection = [];
    if(generalEvaluationFormToSendBackend.isPhysiotherapyPast){
      console.log("giriyor-1",generalEvaluationFormToSendBackend.physiotherapyPast);
      if(this.physiotherapyCenterMap[0].value){
        let physiotheraphyCentral = new PhysiotheraphyCentral(this.physiotherapyCenterMap[0].name);
        physiotherapyPasts.physiotheraphyCentralCollection.push(physiotheraphyCentral);
      }
      if(this.physiotherapyCenterMap[1].value){
        let physiotheraphyCentral = new PhysiotheraphyCentral(this.physiotherapyCenterMap[1].name);
        physiotherapyPasts.physiotheraphyCentralCollection.push(physiotheraphyCentral);
      }
    }
    console.log("cikiyor-1", physiotherapyPasts);

    delete generalEvaluationFormToSendBackend.isPhysiotherapyPast;

    return physiotherapyPasts;
  }

  cleanGeneralEvaluationFormFromBoolean = (generalEvaluationFormToSendBackend:any) =>{
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
        text: "Sil",
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


  //******* Other Orthesis Event Handlers start *******//
  getOtherOrthesisOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewOtherOrthesisOptions1(i));
    }
    return options;
  }
  generateNewOtherOrthesisOptions1(index: number) {
    return [
      { stylingMode: 'outlined',
        placeholder: 'Ortezin tanımı',
        maxLength:200
      },
      {
        stylingMode: "text",
        icon: "trash",
        text: "Sil",
        onClick: () => {
          this.generalEvaluationForm.otherOrthesisInfoCollection.splice(index, 1);
          this.otherOrthesisOptions = this.getOtherOrthesisOptions(this.generalEvaluationForm.otherOrthesisInfoCollection);
        }
      }
    ];
  }
  //******* Other Orthesis Event Handlers end *******//


  //******* Used Medicine Event Handlers start *******//
  getUsedMedicineOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewUsedMedicineOptions1(i));
    }
    return options;
  }
  generateNewUsedMedicineOptions1(index: number) {
    return [
      { stylingMode: 'outlined',
        placeholder: 'İlaç İsmi',
        maxLength:200
      },
      {
        stylingMode: "text",
        icon: "trash",
        onClick: () => {
          this.generalEvaluationForm.usedMedicineCollection.splice(index, 1);
          this.usedMedicineOptions = this.getUsedMedicineOptions(this.generalEvaluationForm.usedMedicineCollection);
        }
      }
    ];
  }
  //******* Used Medicine Event Handlers end *******//


  //******* Expectations Event Handlers start *******//
  getExpectationsAboutProgramOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewExpectationsAboutProgramOptions1(i));
    }
    return options;
  }
  generateNewExpectationsAboutProgramOptions1(index: number) {
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

  goBackForm = () =>{
    this.backStepper.emit();
  }

  //validation rules
  checkIsNull = (event)=>{
    return event.value !== null;
  }

  // image uploader
  uploadBotoxReport = (event) => {
    // console.log("uploadBotoxReport: ", event.value);
    this.generalEvaluationForm.botoxTreatment.botoxRecordFile = event.value[0];
  }
  uploadAppliedSurgeryReport = (event, index) => {
    this.generalEvaluationForm.appliedSurgeryCollection[index].epicrisisImageFile =  event.value[0];
  }
  uploadOtherOrthesisImage = (event, index) => {
    this.generalEvaluationForm.otherOrthesisInfoCollection[index].orthesisImageFile =  event.value[0];
  }

  handleClickCauseForAfterBirthReasonCerebralPalsy = (event) => {
    if(event.value === "Travma"){
      this.generalEvaluationForm.isTraumaVisible = true;
      this.generalEvaluationForm.isBrainTumour = false;
      this.generalEvaluationForm.isAfterSurgerySituation = false;
      this.generalEvaluationForm.isBrainBleedingOrBloodCirculationOrVascularDisorder = false;
    }
    if(event.value === "Beyin tümörleri"){
      this.generalEvaluationForm.isBrainTumour = true;
      this.generalEvaluationForm.isTraumaVisible = false;
      this.generalEvaluationForm.isAfterSurgerySituation = false;
      this.generalEvaluationForm.isBrainBleedingOrBloodCirculationOrVascularDisorder = false;

    }
    if(event.value === "Cerrahi sonrası durumlar"){
      this.generalEvaluationForm.isAfterSurgerySituation = true;
      this.generalEvaluationForm.isBrainTumour = false;
      this.generalEvaluationForm.isTraumaVisible = false;
      this.generalEvaluationForm.isBrainBleedingOrBloodCirculationOrVascularDisorder = false;
    }
    if(event.value === "Kan dolanımı" || event.value === "Damar bozuklukları" || event.value === "Beyin kanamaları"){
      this.generalEvaluationForm.isBrainBleedingOrBloodCirculationOrVascularDisorder = true;
      this.generalEvaluationForm.isAfterSurgerySituation = false;
      this.generalEvaluationForm.isBrainTumour = false;
      this.generalEvaluationForm.isTraumaVisible = false;
    }
  }
}
