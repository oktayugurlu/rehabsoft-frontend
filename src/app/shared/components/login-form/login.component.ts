import {CommonModule} from '@angular/common';
import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../security/authentication.service';
import {DxButtonModule} from 'devextreme-angular';
import {TokenDto} from '../../../models/tokendto';
import {Role} from '../../../models/role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitbuttonOptions:any = {useSubmitBehavior: true, text: 'Sign In', onClick: (event)=>this.login(event), width: '100%',type:"default"};

  loginForm: {
    username: '',
    password: '',
  };
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  currentUser: TokenDto;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loginForm = {
      username: '',
      password: ''
    };

    console.log("------------LOGINE GELDI------", this.currentUser);
    this.returnUrl = '/';

    if(this.currentUser !== null){
      if(this.currentUser.role === Role.User)
        this.router.navigate(['/user']);
      if(this.currentUser.role === Role.Doctor)
        this.router.navigate(['/doctor']);
      if(this.currentUser.role === Role.Admin)
        this.router.navigate(['/admin']);
    }

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(event) {
    this.submitted = true;

    // stop here if form is invalid
    if (!event.validationGroup.validate().isValid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.username, this.loginForm.password)
      .pipe(first())
      .subscribe(
        data => {
          // buraya ve router'i sil
          // this.router.navigate([this.returnUrl]).then(r => {});
          console.log("homeeeeeeeeeee----------------------------------");
          if(data.role === Role.User)
            this.router.navigate(['/user']);
          if(data.role === Role.Doctor)
            this.router.navigate(['/doctor']);
          if(data.role === Role.Admin)
            this.router.navigate(['/admin']);
        },
        error => {
          this.error = error;
          this.loading = false;
          notify(error, "warning", 1000);
        });
    event.preventDefault()
  }

  onCreateAccountClick = () => {
    this.router.navigate(['register']).then(r => {});
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxButtonModule
  ],
  declarations: [ LoginComponent ],
  exports: [ LoginComponent ]
})
export class LoginFormModule { }
