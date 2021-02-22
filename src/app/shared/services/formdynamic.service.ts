import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {AssignedForm} from '../../models/dynamicform/assignedform';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FormDynamicService {

  constructor(private http: HttpClient) { }

  // For Doctors
  getAllAssigned(tcKimlikNo:string) {
    return this.http.get<AssignedForm[]>(`${environment.API_BASE_PATH}/form-dynamic/historyy/${tcKimlikNo}`);
  }

  assignForm(assignedForm: AssignedForm, tcKimlikNo: string){
    return this.http.post<any>(`${environment.API_BASE_PATH}/form-dynamic/assignform/${tcKimlikNo}`, assignedForm);
  }


  // For Patients
  getAllAssignedNotAnswered(tcKimlikNo: string){
    return this.http.get<AssignedForm[]>(`${environment.API_BASE_PATH}/form-dynamic/requests-not-answered/${tcKimlikNo}`);
  }

  getAllAssignedAnswered(tcKimlikNo: string){
    return this.http.get<AssignedForm[]>(`${environment.API_BASE_PATH}/form-dynamic/requests-answered/${tcKimlikNo}`);
  }



}
