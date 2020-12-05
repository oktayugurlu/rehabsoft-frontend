import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import {BehaviorSubject, Observable} from "rxjs";
import {TokenDto} from "../../models/tokendto";
import {Patient} from "../../models/patient";
import {AuthenticationService} from "../../security/authentication.service";
import {GeneralEvaluationForm} from "../../models/generalevaluationform/generalevaluationform";
import {AppliedSurgery} from "../../models/generalevaluationform/appliedsurgery";
import {OtherOrthesisInfo} from "../../models/generalevaluationform/otherorthesisinfo";
import {BotoxTreatment} from "../../models/generalevaluationform/botoxtreatment";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {

    private patientSubject: BehaviorSubject<Patient>;
    public patient: Observable<Patient>;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
      this.patientSubject = new BehaviorSubject<Patient>(new Patient());
      this.patient = this.patientSubject.asObservable();
    }

    // getter setter of patient subject
    public get getPatient(): Patient {
      return this.patientSubject.value;
    }
    public set setPatient(patient: Patient) {
      let newPatient = {...this.patientSubject.value};
      newPatient.parentCollection = (patient.parentCollection!==null)?patient.parentCollection:newPatient.parentCollection;
      newPatient.tcKimlikNo = (patient.tcKimlikNo!==null)?patient.tcKimlikNo:newPatient.tcKimlikNo;
      newPatient.address = (patient.address!==null)?patient.address:newPatient.address;

      this.patientSubject.next(patient);
    }

    getAll() {
      return this.http.get<User[]>(`${environment.API_BASE_PATH}/users/all`);
    }

    getByUsername(username: string) {
      return this.http.get<User>(`${environment.API_BASE_PATH}/users/${username}`);
    }

    updateUser(userDto:User){
      return this.http.put<any>(`${environment.API_BASE_PATH}/users/update`,userDto);
    }

    postGeneralEvaluationForm(generalEvaluationForm: GeneralEvaluationForm){
      const payload = new FormData();

      this.appendBotoxImage(generalEvaluationForm.botoxTreatment, payload);
      this.appendEpicrisisImagesToFormDataAndAddIndexToURLField(generalEvaluationForm.appliedSurgeryCollection, payload);
      this.appendOrthesisImagesToFormDataAndAddIndexToURLField(generalEvaluationForm.otherOrthesisInfoCollection, payload);

      payload.append('model', JSON.stringify(generalEvaluationForm));

      return this.http.post<GeneralEvaluationForm>(`${environment.API_BASE_PATH}/patient/generalevaluationform/create`, payload, { observe: 'response' })
        .pipe(map(resp => {
          return resp;
        }));
    }

    appendBotoxImage = (botoxTreatment: BotoxTreatment, payload: FormData) =>{
      if(botoxTreatment !== null){
        if(botoxTreatment.botoxRecordFile !== null){
          console.log(botoxTreatment.botoxRecordFile);
          payload.append('botoxImageFile', botoxTreatment.botoxRecordFile);
        }
      }
    }

    appendEpicrisisImagesToFormDataAndAddIndexToURLField = (appliedSurgeryCollection: AppliedSurgery[], payload: FormData) =>{
      if(appliedSurgeryCollection !== null ){
        if(appliedSurgeryCollection.length>0){

          appliedSurgeryCollection.forEach((appliedSurgery,index)=>{
            if( !this.checkIsEmpty(appliedSurgery.epicrisisImageFile) ){
              console.log("eklemeden once name: ", appliedSurgery.epicrisisImageFile.name);
              payload.append('appliedSurgeryEpicrisisImages', new Blob([appliedSurgery.epicrisisImageFile]), appliedSurgery.surgeryName+'.'+appliedSurgery.epicrisisImageFile.name.split('.').pop());

            }
          });
        }
      }
    }

  appendOrthesisImagesToFormDataAndAddIndexToURLField = (otherOrthesisInfoCollection: OtherOrthesisInfo[], payload: FormData) =>{
    if(otherOrthesisInfoCollection !== null ){
      if(otherOrthesisInfoCollection.length>0){
        otherOrthesisInfoCollection.forEach((otherOrthesisInfo,index)=>{
          if( !this.checkIsEmpty(otherOrthesisInfo.orthesisImageFile) ){
            payload.append('otherOrthesisImages',
              new Blob([otherOrthesisInfo.orthesisImageFile]),
              otherOrthesisInfo.orthesisName+'.'+otherOrthesisInfo.orthesisImageFile.name.split('.').pop()
            );
          }
        });
      }
    }
  }

  checkIsEmpty = (object: any) =>{
    if(object === undefined ){
      return true;
    }
    return object === null;
  }


  postPatient(patient: Patient){
    return this.http.post<Patient>(`${environment.API_BASE_PATH}/patient/create`, patient);
  }




// Hata servisi{
//   isOk: false,
//   message: "Failed to change password"
// }
}
