import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ResetPasswordFormComponent, ChangePasswordFormComponent } from './shared/components';
import {LoginComponent, CreateAccountFormComponent, FooterModule} from './shared/components';

import { UserHomeComponent } from './pages/user/home/user-home.component';
import { UserProfileComponent } from './pages/user/profile/user-profile.component';
import { UserTasksComponent } from './pages/user/tasks/user-tasks.component';
import {
  DxAccordionModule, DxBoxModule, DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule, DxFileUploaderModule,
  DxFormModule,
  DxLoadIndicatorModule, DxNumberBoxModule, DxRadioGroupModule, DxSelectBoxModule,
  DxSliderModule,
  DxTagBoxModule,
  DxTemplateModule, DxTextAreaModule
} from 'devextreme-angular';
import {AuthGuard} from './security/auth.guard';
import {NotfoundComponent} from './shared/notfound/notfound.component';
import {UnauthorizedComponent} from './shared/unauthorized/unauthorized.component';
import {Role} from './models/role';
import {UserComponent} from './pages/user/user.component';
import {DoctorProfileComponent} from './pages/doctor/profile/doctor-profile.component';
import {DoctorTasksComponent} from './pages/doctor/tasks/doctor-tasks.component';
import {DoctorHomeComponent} from './pages/doctor/home/doctor-home.component';
import {DoctorComponent} from './pages/doctor/doctor.component';
import {AdminProfileComponent} from './pages/admin/profile/admin-profile.component';
import {AdminTasksComponent} from './pages/admin/tasks/admin-tasks.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AdminHomeComponent} from './pages/admin/home/admin-home.component';
import {PagesComponent} from './pages/pages.component';
import {SideNavOuterToolbarModule} from './layouts';
import {NecessaryFormsComponent} from './pages/user/necessaryforms/necessary-forms.component';

import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

// Devextreme

// MdBootstrap
import { WavesModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {PatientFormComponent} from "./pages/user/necessaryforms/patientform/patient-form.component";
import {GeneralEvaluationFormComponent} from "./pages/user/necessaryforms/generalevaluationform/general-evaluation-form.component";
import {UserNotificationComponent} from "./pages/user/notifiaction/user-notification.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    canActivate: [ AuthGuard ],
    data: { roles: [Role.User] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: UserHomeComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'task', component: UserTasksComponent },
      { path: 'general-evaluation-form', component: NecessaryFormsComponent },
      { path: 'user-notification', component: UserNotificationComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [ AuthGuard ],
    data: { roles: [Role.Admin] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: AdminHomeComponent },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'task', component: AdminTasksComponent }
    ]
  },
  {
    path: 'doctor',
    canActivate: [ AuthGuard ],
    data: { roles: [Role.Doctor] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: DoctorHomeComponent },
      { path: 'profile', component: DoctorProfileComponent },
      { path: 'task', component: DoctorTasksComponent }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: CreateAccountFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule, DxLoadIndicatorModule,
    FooterModule, SideNavOuterToolbarModule, CommonModule, BrowserModule, DxFileUploaderModule,
    DxAccordionModule, DxCheckBoxModule, DxSliderModule, DxTagBoxModule, DxTemplateModule, DxBoxModule,
    DxTextAreaModule, DxSelectBoxModule, DxNumberBoxModule, DxRadioGroupModule,
    MDBBootstrapModule, WavesModule, DxButtonModule],

  exports: [RouterModule],
  declarations: [
    PagesComponent,
    UserComponent, UserHomeComponent, UserProfileComponent, UserTasksComponent, NecessaryFormsComponent, UserNotificationComponent,
    PatientFormComponent, GeneralEvaluationFormComponent,
    DoctorComponent, DoctorHomeComponent, DoctorProfileComponent, DoctorTasksComponent,
    AdminComponent, AdminHomeComponent, AdminProfileComponent, AdminTasksComponent]
})
export class AppRoutingModule { }
