import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {AssignedForm} from '../../models/dynamicform/assignedform';
import {HttpClient} from '@angular/common/http';
import {FormTemplate} from '../../models/dynamicform/formtemplate';

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

  getAllTemplates(userName:string){
    return this.http.get<FormTemplate[]>(`${environment.API_BASE_PATH}/form-dynamic/get-all-templates/${userName}`);
  }


  // For Patients
  getAllAssignedNotAnswered(tcKimlikNo: string){
    return this.http.get<AssignedForm[]>(`${environment.API_BASE_PATH}/form-dynamic/requests-not-answered/${tcKimlikNo}`);
  }

  getAllAssignedAnswered(tcKimlikNo: string){
    return this.http.get<AssignedForm[]>(`${environment.API_BASE_PATH}/form-dynamic/requests-answered/${tcKimlikNo}`);
  }

  findAssignFormById(id : string){
    return this.http.get<AssignedForm>(`${environment.API_BASE_PATH}/form-dynamic/get-assigned-form/${id}`)
  }

  answerTheForm(assignedForm: AssignedForm, formID: string){
    return this.http.post<any>(`${environment.API_BASE_PATH}/form-dynamic/answer-the-form/${formID}`, assignedForm);
  }



}
