import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {AuthenticationService} from '../../../../security/authentication.service';
import {Hyperbilirubinemia} from "../../../../models/generalevaluationform/hyperbilirubinemia";
import {AfterBirthReasonCerebralPalsy} from "../../../../models/generalevaluationform/afterbirthreasoncerebralpalsy";
import {AppliedSurgery} from "../../../../models/generalevaluationform/appliedsurgery";
import {OtherOrthesisInfo} from "../../../../models/generalevaluationform/otherorthesisinfo";
import {UsedMedicine} from "../../../../models/generalevaluationform/usedmedicine";
import {OrthesisInfo} from "../../../../models/generalevaluationform/orthesisinfo";


@Component({
  selector: 'app-applied-treatments',
  templateUrl: './applied-treatments.component.html',
  styleUrls: ['./applied-treatments.component.scss']
})
export class AppliedTreatmentsComponent {

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
  isBotoxTreatmentList = [{name:'Oldu', value: true},{name:'Hiç olmadı', value: false}];
  isBotoxTreatmentOption = {
    dataSource: this.isBotoxTreatmentList,
    layout:"horizontal",
    valueExpr: 'value',
    displayExpr: 'name'
  };

  lastBotoxDateOption = {
    stylingMode: 'outlined',
    showClearButton:"true",
    useMaskBehavior:"true",
    displayFormat:"shortdate",
    onValueChanged:(event)=>{
    }
  }

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



  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

    this.generalEvaluationForm['isOrthesisMap'] = this.isOrthesisMap;
    this.generalEvaluationForm['orthesisMap'] = this.orthesisMap;
  }

  ngOnInit() {
    console.log("state management---");

  }

  checkIsNull = (event)=>{
    return event.value !== null;
  }

  //Patient form event handler end




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

  //--------- event handlers to add One-to-Many relation objects ----------//
  //******* Applied Surgery Event Handlers start *******//
  private getAppliedSurgeryOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewAppliedSurgeryOptions1(i));
    }
    return options;
  }
  private generateNewAppliedSurgeryOptions1(index: number) {
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
  private onCustomItemCreatingForAppliedSurgerySelectbox = (event)=>{
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
  private getOtherOrthesisOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewOtherOrthesisOptions1(i));
    }
    return options;
  }
  private generateNewOtherOrthesisOptions1(index: number) {
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
  private getUsedMedicineOptions(appliedSurgery: any) {
    let options = [];
    for (let i = 0; i < appliedSurgery.length; i++){
      options.push(this.generateNewUsedMedicineOptions1(i));
    }
    return options;
  }
  private generateNewUsedMedicineOptions1(index: number) {
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
    this.generalEvaluationForm.orthesisInfoCollection = this.generateOrthesisCollection(this.generalEvaluationForm);
    this.nextStepper.emit();
  }

  private generateOrthesisCollection = (generalEvaluationFormToSendBackend:any):OrthesisInfo[] =>{
    let orthesisCollectionForField: OrthesisInfo[] = [];
    generalEvaluationFormToSendBackend.isOrthesisMap.forEach( isOrthesis=>{
      if(isOrthesis.value){
        let orthesisInfo = new OrthesisInfo(this.orthesisMap.get(isOrthesis.name).get("left"),
          this.orthesisMap.get(isOrthesis.name).get("right"), isOrthesis.name);
        orthesisCollectionForField.push(orthesisInfo);
      }
    });
    return orthesisCollectionForField;
  }


}
