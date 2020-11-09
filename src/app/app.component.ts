import {Component, OnInit} from '@angular/core';


import {Router} from '@angular/router';

import {AuthenticationService} from './security/authentication.service';
import {Role} from './models/role';
import {TokenDto} from './models/tokendto';
import {AppInfoService} from './shared/services';
import {adminNavigation, doctorNavigation, userNavigation} from './app-navigation';
import {UserService} from './shared/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userNavigation = userNavigation;
  doctorNavigation = doctorNavigation;
  adminNavigation = adminNavigation;

  currentUser: TokenDto;

  isAdmin = false;
  isDoctor = false;
  isUserAndIsFilledGeneralEvaluationFormAndPatientForm = false;
  isNotAuthorized = false;

  // constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { }
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public appInfo: AppInfoService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => {
        let isGeneralEvaluationFormExist = false;
        let isPatientFormExist = false;
        this.currentUser = x;
        this.isNotAuthorized = this.checkisNotAuthorized();

        if(!this.isNotAuthorized){
          userService.checkIsGeneralEvaluationFormExist().subscribe((isExist=>{
            isGeneralEvaluationFormExist = true;
            userService.checkIsPatientFormExist().subscribe(isExist=>{
                isPatientFormExist = true;
                this.isUserAndIsFilledGeneralEvaluationFormAndPatientForm = this.checkisUserAndIsFilledGeneralEvaluationForm() && isGeneralEvaluationFormExist && isPatientFormExist;
              }
            );
          }));
        }

        this.isDoctor = this.checkisDoctor();
        this.isAdmin = this.checkisAdmin();
      }
    );
  }

  ngOnInit(): void {
    console.log("app components uyandi this.currentUser::::",this.currentUser);
    console.log(this.isNotAuthorized, this.isUserAndIsFilledGeneralEvaluationFormAndPatientForm, this.isDoctor, this.isAdmin, this.currentUser);
  }

  checkisNotAuthorized = () => {
    return this.currentUser === null;
  }

  checkisUserAndIsFilledGeneralEvaluationForm = () => {
    if(!(this.currentUser === null)){
      // Eger kullanici formu doldurmamis ise yonlendirme olacak forma

      return this.currentUser.role === Role.User
    }
    else return false;
  }
  checkisDoctor = () => {
    if(!(this.currentUser === null)){
      return this.currentUser.role === Role.Doctor;
    }
    else return false;
  }

  checkisAdmin = () => {
    if(!(this.currentUser === null)){
      return this.currentUser.role === Role.Admin ;
    }
    else return false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
