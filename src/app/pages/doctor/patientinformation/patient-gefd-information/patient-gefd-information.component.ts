import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { GeneralEvaluationForm, } from 'src/app/models/generalevaluationform/generalevaluationform';
import {GeneralFormService} from "../../../../shared/services/generalform.service"
import { ViewChild} from '@angular/core';
import {DxFileUploaderComponent, DxRadioGroupComponent} from "devextreme-angular";
import {Hyperbilirubinemia} from "../../../../models/generalevaluationform/hyperbilirubinemia";
import {AfterBirthReasonCerebralPalsy} from "../../../../models/generalevaluationform/afterbirthreasoncerebralpalsy";
import {VisualImpairment} from "../../../../models/generalevaluationform/visualimpairment";
import {HearingImpairment} from "../../../../models/generalevaluationform/hearingimpairment";
import {PhysiotherapyPast} from "../../../../models/generalevaluationform/physiotherapypast";
import {GeneralEvFormBoolean } from 'src/app/models/generalevaluationform/generalEvFormBoolean';

@Component({
  selector: 'app-patient-gefd-information',
  templateUrl: './patient-gefd-information.component.html',
  styleUrls: ['./patient-gefd-information.component.scss']
})
export class PatientGefdInformationComponent implements OnInit {

  generalEvaluationForm:GeneralEvaluationForm;

  @ViewChild("eventRadioGroupMultiplePregnancy") eventRadioGroup: DxRadioGroupComponent;
  @ViewChild("dxFileUploaderComponentBotoxReport") eventBotoxReport: DxFileUploaderComponent;

  appliedSurgeriesFiles:File[]=[];

  deneme=true;
  loading = false;
  error = '';
  submitted = false;
  
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


  constructor(private generalFormService:GeneralFormService) { }

  ngOnInit() {
   
    //console.log("isim:" + this.username);
    this.getGeneralEvaluationForm();
    
  }



  getGeneralEvaluationForm = ()=>  { this.generalFormService.getById().subscribe(
    (data)=>{
      
      console.log(data);
     this.generalEvaluationForm = data;
    },
    (error)=>{
      notify(error);
    }
  );

}

fillBooleanGeneralForm=() => {


}






}
