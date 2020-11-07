import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ResetPasswordFormComponent, ChangePasswordFormComponent } from './shared/components';
import {LoginComponent, CreateAccountFormComponent, FooterModule} from './shared/components';

import { UserHomeComponent } from './pages/user/home/user-home.component';
import { UserProfileComponent } from './pages/user/profile/user-profile.component';
import { UserTasksComponent } from './pages/user/tasks/user-tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
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

import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

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
      { path: 'home', component: UserHomeComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [ AuthGuard ],
    data: { roles: [Role.Admin] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: AdminHomeComponent }
    ]
  },
  {
    path: 'doctor',
    canActivate: [ AuthGuard ],
    data: { roles: [Role.Doctor] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: DoctorHomeComponent }
    ]
  },
  {
    path: 'tasks',
    component: UserTasksComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: CreateAccountFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule,
    FooterModule, SideNavOuterToolbarModule, CommonModule, BrowserModule],
  exports: [RouterModule],
  declarations: [
    PagesComponent,
    UserComponent, UserHomeComponent, UserProfileComponent, UserTasksComponent,
    DoctorComponent, DoctorHomeComponent, DoctorProfileComponent, DoctorTasksComponent,
    AdminComponent, AdminHomeComponent, AdminProfileComponent, AdminTasksComponent]
})
export class AppRoutingModule { }
