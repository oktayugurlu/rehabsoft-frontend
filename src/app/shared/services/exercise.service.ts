import {EventEmitter, Injectable} from "@angular/core";
import {Patient} from "../../models/patient";
import {Exercise} from "../../models/exercise/exercise";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../security/authentication.service";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ExerciseService {

  // exerciseList: EventEmitter<Exercise> = new EventEmitter();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

  }

  getAll() {
    return this.http.get<Exercise[]>(`${environment.API_BASE_PATH}/exercises/all`);
  }

  deleteById(id:number) {
    console.log("siliniyor: ",id);
    return this.http.delete<string>(`${environment.API_BASE_PATH}/exercises/delete/${id}`);
  }
}
