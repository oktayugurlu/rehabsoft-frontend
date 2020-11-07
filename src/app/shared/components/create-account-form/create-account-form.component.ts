import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../security/authentication.service';


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  registerForm: any;
  loading = false;
  submitted = false;
  error = '';

  submitbuttonOptions:any = {text: 'Create a new account', onClick: ()=>this.register(Event), width: '100%',type:"default"};


  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.registerForm = {
      username: '',
      password:  '',
      firstName: '',
      surname:  '',
      email: '',
      confirmPassword: ''
    };
    this.authenticationService.logout();
  }

  register(event) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.registerForm)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  confirmPassword = (e: { value: string }) => {
    return e.value === this.registerForm.password;
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ CreateAccountFormComponent ],
  exports: [ CreateAccountFormComponent ]
})
export class CreateAccountFormModule { }
