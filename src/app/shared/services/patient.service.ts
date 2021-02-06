import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { PatientDetails } from 'src/app/models/patientdetails';

import {DoctorInfo} from 'src/app/models/doctor-info';

@Injectable({ providedIn: 'root' })
export class PatientService {

    constructor(private http: HttpClient) {

    }

    getAll() {
        return this.http.get<PatientDetails[]>(`${environment.API_BASE_PATH}/patient/all`);
      }

    getPatientByTcKimlikNo(tcKimlikNo:string){
      return this.http.get<PatientDetails>(`${environment.API_BASE_PATH}/patient/${tcKimlikNo}`);
    }

    getDoctorInfo(){
      return this.http.get<DoctorInfo>(`${environment.API_BASE_PATH}/patient/doctorinfo`);
    }


}