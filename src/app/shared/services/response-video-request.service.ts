import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ResponseVideoRequest} from "../../models/responsevideorequest/responsevideorequest";

@Injectable({ providedIn: 'root' })
export class ResponseVideoRequestService{

  constructor(private http: HttpClient) { }

  postResponseVideoRequest(responseVideoRequest: ResponseVideoRequest,videoRequestId:number){
    console.log("postVideo method in Service");
    return this.http.post<any>(`${environment.API_BASE_PATH}/response-video-request/create/${videoRequestId}`,responseVideoRequest);
  }

  getBy(id:number){
    return this.http.get<ResponseVideoRequest[]>(`${environment.API_BASE_PATH}/response-video-request/get/${id}`);
  }

  getAll(){
    return this.http.get<ResponseVideoRequest[]>(`${environment.API_BASE_PATH}/response-video-request/all/`);
  }

}
