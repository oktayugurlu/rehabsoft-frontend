import {EventEmitter, Injectable} from "@angular/core";
import {Patient} from "../../models/patient";
import {Exercise} from "../../models/exercise/exercise";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../security/authentication.service";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ExerciseService {

  // exerciseList: EventEmitter<Exercise> = new EventEmitter();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

  }

  getAll() {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //   withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
    // };

    return this.http.get<Exercise[]>(`${environment.API_BASE_PATH}/exercises/all`);
  }

  deleteById(id:number) {
    return this.http.delete<string>(`${environment.API_BASE_PATH}/exercises/delete/${id}`);
  }

  getById(id:number){
    return this.http.get<Exercise>(`${environment.API_BASE_PATH}/exercises/get/${id}`);
  }
  save(exercise:Exercise){
    return this.http.get<Exercise>(`${environment.API_BASE_PATH}/exercises/save/${exercise}`);
  }
}
