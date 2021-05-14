import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PhiysiotherapyProgram} from '../../models/exerciseprogram/phiysiotherapyprogram';

@Injectable({ providedIn: 'root' })
export class AssignExerciseProgramService{

  constructor(private http: HttpClient) {
  }

  getAllAssigned(tcKimlikNo:string) {
    return this.http.get<PhiysiotherapyProgram[]>(`${environment.API_BASE_PATH}/assign-exercise-program/get-all-assigned/${tcKimlikNo}`);
  }

  assignNewExerciseProgram(program:PhiysiotherapyProgram ) {
    return this.http.post<any>(`${environment.API_BASE_PATH}/assign-exercise-program/assign-new`, program);
  }
}
