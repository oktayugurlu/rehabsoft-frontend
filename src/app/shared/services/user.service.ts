import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import {Observable} from "rxjs";
import {TokenDto} from "../../models/tokendto";
import {Patient} from "../../models/patient";
import {AuthenticationService} from "../../security/authentication.service";
import {GeneralEvaluationForm} from "../../models/generalevaluationform/generalevaluationform";

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

    postGeneralEvaluationForm(generalEvaluationForm: GeneralEvaluationForm, file:File){
      // let httpHeaders = new HttpHeaders({
      //   'Content-Type': 'multipart/form-data'
      // });
      console.log("fileaaaaa: ", file);

      // const uploadImageData = new FormData();
      // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

      const payload = new FormData();
      payload.append('imageFile', file);
      payload.append('generalFormDto', JSON.stringify(generalEvaluationForm));

      return this.http.post<GeneralEvaluationForm>(`${environment.API_BASE_PATH}/patient/generalevaluationform/create`, payload, { observe: 'response' });
    }




// Hata servisi{
//   isOk: false,
//   message: "Failed to change password"
// }
}
