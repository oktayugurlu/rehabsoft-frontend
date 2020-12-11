import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import{GeneralEvaluationForm} from "../../models/generalevaluationform/generalevaluationform"

@Injectable({ providedIn: 'root' })
export class GeneralFormService {

  constructor(private http: HttpClient) {

  }

  getByTcKimlikNo(tcKimlikNo:string) {
    return this.http.get<any>(`${environment.API_BASE_PATH}/patient/generalevaluationform/get-form/${tcKimlikNo}`);
  }
}
