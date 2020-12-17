import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { JwtInterceptor } from './security/jwt.interceptor';
import { AuthenticationService } from './security/authentication.service';
import { AuthGuard } from './security/auth.guard';
import { ErrorInterceptor } from './security/authentication.interceptor';
import {FooterComponent, FooterModule, HeaderComponent, LoginFormModule, UserPanelModule} from './shared/components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {ApiService} from './shared/services/api.service';
import {DevExtremeModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {NotAuthorizedContainerModule} from './not-authorized-container';
import {AppInfoService, ScreenService} from './shared/services';
import {DxButtonModule} from "devextreme-angular";
import {PatientService} from "./shared/services/patient.service"
import {VideorequestService} from "./shared/services/videorequest.service"

import {DxSelectBoxModule, DxTabPanelModule } from 'devextreme-angular';

import { CommonModule } from '@angular/common';
import { GeneralEvaluationFormComponent } from './pages/user/necessaryforms/generalevaluationform/general-evaluation-form.component';
import { PatientFormComponent } from './pages/user/necessaryforms/patientform/patient-form.component';
import {UserService} from "./shared/services/user.service";
import {ExerciseService} from "./shared/services/exercise.service";

import {CookieService} from "ngx-cookie-service";
import { PatientGefdInformationComponent } from './pages/doctor/patientinformation/patient-gefd-information/patient-gefd-information.component';
import { GeneralInformationComponent } from './pages/doctor/patientinformation/general-information/general-information.component';
import { VideoRequestComponent } from './pages/doctor/patientinformation/video-request/video-request.component';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DevExtremeModule,
    DxDataGridModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    NotAuthorizedContainerModule,
    DxButtonModule,
    UserPanelModule,
    BrowserModule,
    DxDataGridModule,
    DxFormModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    BrowserModule,
    DxTabPanelModule,
  ],
  providers: [ApiService, AuthenticationService, AuthGuard, AppInfoService, ScreenService, UserService, ExerciseService, CookieService,PatientService,VideorequestService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}, // giden her requeste JWT token'ını ekliyor dogrulama icin
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  entryComponents: [JwtInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);
