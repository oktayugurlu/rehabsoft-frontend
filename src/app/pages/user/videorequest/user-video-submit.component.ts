import { Component} from '@angular/core';
import { VideoRequest } from 'src/app/models/video-request';import
{VideorequestService} from "../../../shared/services/videorequest.service";
import notify from 'devextreme/ui/notify';
import {AuthenticationService} from '../../../security/authentication.service';
import {UserService} from '../../../shared/services/user.service';
import {TokenDto} from '../../../models/tokendto';

@Component({
  selector: 'app-user-video-submit',
  templateUrl: 'user-video-submit.component.html',
  styleUrls: [ './user-video-submit.component.scss' ]
})

export class UserVideoSubmitComponent {

  username: string;
  currentUser: TokenDto;
  dataSource: VideoRequest[];
  allowedPageSizesArray =  [5, 10, 20, 50, 100];

  constructor(private videorequestService: VideorequestService, private authenticationService:AuthenticationService, private userService: UserService) {
    authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
      this.username=JSON.parse(localStorage.getItem('currentUser')).username;
    });
  }

  ngOnInit(): void {
    this.getItemsList();
  }

  getItemsList = ()=>{
    this.videorequestService.getAllActive(this.username).subscribe(
      (data)=>{
        this.dataSource = data;
        console.log("data",data);
      },
      (error)=>{
        notify(error);
      }
    );
  }

}
