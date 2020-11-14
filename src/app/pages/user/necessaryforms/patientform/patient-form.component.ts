import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Parent} from "../../../../models/parent";
import {AuthenticationService} from "../../../../security/authentication.service";
import {Patient} from "../../../../models/patient";
import {UserService} from "../../../../shared/services/user.service";
import {Phone} from "../../../../models/phone";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit, OnDestroy  {

  loading = false;
  error = '';

  patientFromService: Patient;
  currentUser: any;

// Patient variable
  addPhoneButtonOptions1: any;
  addPhoneButtonOptions2: any;
  phoneOptions1: any[] = [];
  phoneOptions2: any[] = [];
  patientForm:any = {
    parent1: new Parent(),
    parent2: new Parent(),
    phoneNumberListForParent1: [],
    phoneNumberListForParent2: [],
  }

  @Output() nextStepper: EventEmitter<any> = new EventEmitter();
  goNextForm = (event)=>{
    // stop here if form is invalid
    if (!event.validationGroup.validate().isValid) {
      return;
    }
    this.fillParenCollectionFromPatientFrom();
    this.nextStepper.emit();
  }

  private fillParenCollectionFromPatientFrom = () =>{
    let newPatient = new Patient();
    newPatient.parentCollection = [];
    let parent1 = this.parentCreator(1);
    let parent2 = this.parentCreator(2);

    newPatient.parentCollection.push(parent1);
    newPatient.parentCollection.push(parent2);

    this.authenticationService.currentUser.subscribe(user=> {
      newPatient.tcKimlikNo = user.username;
      this.userService.patient.next(newPatient);
    });

  }

  private parentCreator = (whichParent:number) =>{
    let parent:Parent = new Parent();
    parent.firstname = (whichParent===1) ? this.patientForm.parent1.firstname.trim() :  this.patientForm.parent2.firstname.trim();
    parent.surname = (whichParent===1) ? this.patientForm.parent1.surname.trim() : this.patientForm.parent2.surname.trim();
    parent.parentType = (whichParent===1) ? this.patientForm.parent1.parentType.trim() : this.patientForm.parent2.parentType.trim();
    parent.email = (whichParent===1) ? this.patientForm.parent1.email.trim() : this.patientForm.parent2.email.trim();
    parent.phoneCollection = [];
    if(whichParent===1){
      this.patientForm.phoneNumberListForParent1.forEach(phoneNumber=>{
        let phoneToAddParent = new Phone();
        phoneToAddParent.phoneNumber = phoneNumber;
        parent.phoneCollection.push(phoneToAddParent);
      });
    }else{
      this.patientForm.phoneNumberListForParent2.forEach(phoneNumber=>{
        let phoneToAddParent = new Phone();
        phoneToAddParent.phoneNumber = phoneNumber;
        parent.phoneCollection.push(phoneToAddParent);
      });
    }
    return parent;
  }

  nextbuttonOptions:any = {useSubmitBehavior: false, text: 'İleri', onClick: (event)=>this.goNextForm(event),
    width: '130px',type:"default", icon: 'fas fa-arrow-circle-right'};



  constructor(private userService: UserService, private authenticationService: AuthenticationService) {

    this.userService.patient.subscribe(patient=>{
      this.patientFromService = patient;
    });

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
  }
  ngOnDestroy() {
    // window.clearInterval();
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
            this.patientForm.phoneNumberListForParent2.splice(index, 1);
            this.phoneOptions1 = this.getPhonesOptions1(this.patientForm.phoneNumberListForParent1);
          }
        }
      }]
    }
  }


}
