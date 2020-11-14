import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import {Observable} from "rxjs";
import {TokenDto} from "../../models/tokendto";
import {Patient} from "../../models/patient";
import {AuthenticationService} from "../../security/authentication.service";

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

    checkIsPatientFormExist(){
      return this.http.get<boolean>(`${environment.API_BASE_PATH}/patient/ispatientexist`);
    }
    checkIsGeneralEvaluationFormExist(){
      return this.http.get<boolean>(`${environment.API_BASE_PATH}/patient/generalevaluationform/isgeneralevaluationformexist`);
    }



// Hata servisi{
//   isOk: false,
//   message: "Failed to change password"
// }
}
