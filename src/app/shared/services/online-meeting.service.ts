import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class OnlineMeetingService {

  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Notification[]>(`${environment.API_BASE_PATH}/notification/all`);
  }



}
