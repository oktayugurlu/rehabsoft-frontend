import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {AssignedForm} from '../../models/dynamicform/assignedform';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FormDynamicService {

  constructor(private http: HttpClient) { }

  getAllAssigned(tcKimlikNo:string) {
    return this.http.get<AssignedForm[]>(`${environment.API_BASE_PATH}/form-dynamic/historyy/${tcKimlikNo}`);
  }
}
