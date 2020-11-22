import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import {Observable} from "rxjs";
import {TokenDto} from "../../models/tokendto";
import {Patient} from "../../models/patient";
import {AuthenticationService} from "../../security/authentication.service";
import {GeneralEvaluationForm} from "../../models/generalevaluationform/generalevaluationform";
import {stringify} from "@angular/compiler/src/util";
import {AppliedSurgery} from "../../models/generalevaluationform/appliedsurgery";
import {OtherOrthesisInfo} from "../../models/generalevaluationform/otherorthesisinfo";
import {BotoxTreatment} from "../../models/generalevaluationform/botoxtreatment";

@Injectable({ providedIn: 'root' })
export class UserService {

    patient: EventEmitter<Patient> = new EventEmitter();

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

    }

    getAll() {
      return this.http.get<User[]>(`${environment.API_BASE_PATH}/users/all`);
    }

    getById(id: number) {
      return this.http.get<User>(`${environment.API_BASE_PATH}/users/${id}`);
    }

    postGeneralEvaluationForm(generalEvaluationForm: GeneralEvaluationForm){

      // const uploadImageData = new FormData();
      // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

      const payload = new FormData();

      this.appendBotoxImage(generalEvaluationForm.botoxTreatment, payload);
      this.appendEpicrisisImagesToFormDataAndAddIndexToURLField(generalEvaluationForm.appliedSurgeryCollection, payload);
      this.appendOrthesisImagesToFormDataAndAddIndexToURLField(generalEvaluationForm.otherOrthesisInfoCollection, payload);

      payload.append('model', JSON.stringify(generalEvaluationForm));

      return this.http.post<GeneralEvaluationForm>(`${environment.API_BASE_PATH}/patient/generalevaluationform/create`, payload, { observe: 'response' });
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
          let epicrisisImageCounter = 0;
          appliedSurgeryCollection.forEach((appliedSurgery,index)=>{
            if( !this.checkIsEmpty(appliedSurgery) ){
              console.log("eklemeden once name: ", appliedSurgery.epicrisisImageFile.name);
              appliedSurgery.epicrisisImageFile = new File([appliedSurgery.epicrisisImageFile], appliedSurgery.surgeryName+'.'+appliedSurgery.epicrisisImageFile.name.split('.').pop());
              console.log("isim degistikten sonra: ", appliedSurgery.epicrisisImageFile);
              appliedSurgery.epicrisisImageUrl = stringify(epicrisisImageCounter);
              payload.append('appliedSurgeryEpicrisisImages', appliedSurgery.epicrisisImageFile);
              epicrisisImageCounter++;
            }
          });
        }
      }
    }

  appendOrthesisImagesToFormDataAndAddIndexToURLField = (otherOrthesisInfoCollection: OtherOrthesisInfo[], payload: FormData) =>{
    let orthesisImageCounter = 0;
    if(otherOrthesisInfoCollection !== null ){
      if(otherOrthesisInfoCollection.length>0){
        otherOrthesisInfoCollection.forEach((otherOrthesisInfo,index)=>{
          if( otherOrthesisInfo.orthesisImageFile !== null){
            otherOrthesisInfo.orthesisUrl = stringify(orthesisImageCounter);
            payload.append('otherOrthesisImages', otherOrthesisInfo.orthesisImageFile);
            orthesisImageCounter++
          }
        });
      }
    }
  }

  checkIsEmpty = (object: any) =>{
    if(object.epicrisisImageFile === undefined ){
      return true;
    }
    console.log(object.epicrisisImageFile);
    return object.epicrisisImageFile === null;
  }




// Hata servisi{
//   isOk: false,
//   message: "Failed to change password"
// }
}
