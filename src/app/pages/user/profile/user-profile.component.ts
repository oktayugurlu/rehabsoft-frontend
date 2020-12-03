import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {User} from "../../../models/user"
import notify from "devextreme/ui/notify";

@Component({
  templateUrl: 'user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})

export class UserProfileComponent {
  userDetails:any;
  colCountByScreen: object;
  username:any;
  userDto:User;

  ngOnInit() {

    
    this.username=JSON.parse(localStorage.getItem('currentUser')).username;
    //console.log("isim:" + this.username);
    this.getcurrentUserDetails(this.username);
  }


  constructor(private userService: UserService) { 
    
    //this.username = localStorage.getItem('username');
    
    this.userDetails = {   
      firstName:"",
      lastName: '',
      email: ''
            /* tslint:disable-next-line:max-line-length */
   
    };
    
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }



    getcurrentUserDetails = (username:string)=>  { this.userService.getByUsername(username).subscribe(
      (data)=>{
        this.userDetails = {   
          FirstName:data.firstName,
          LastName: data.surname,
          Email: data.email,
        };
        console.log(data);
        this.userDto = data;
      },
      (error)=>{
        notify(error);
      }
    );

  }


  updateUserDetails=() =>{
    this.userDto.firstName= this.userDetails.FirstName;
    this.userDto.surname = this.userDetails.LastName;
    this.userDto.email = this.userDetails.Email;
    console.log(this.userDto);
    this.userService.updateUser(this.userDto).subscribe(data => notify(JSON.stringify(data.responseMessage)));
  }

  

}
