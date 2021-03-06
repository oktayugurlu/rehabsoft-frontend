import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Patient} from "../../../models/patient";
import {PatientService} from "../../../shared/services/patient.service";

@Component({
  selector: 'app-patientinformation',
  templateUrl: './patientinformation.component.html',
  styleUrls: ['./patientinformation.component.scss'],


})
export class PatientinformationComponent implements OnInit {

  titleList = ["Genel Degerlendirme Formu","Görüşmeler","Raporlar","Egzersiz Geçmişi"];
  itemCount: number;
  generalEvalFormurl:string;
  generalInformationUrl:string;
  videoRequestUrl:string;
  messageUrl:string;
  dynamicFormsUrl:string;
  exerciseProgramsUrl:string;
  onlineMeetingsUrl:string;
  patient:Patient;
  tcKimlikNo:string;

  constructor(private router: Router,private route: ActivatedRoute, private patientService:PatientService) {
      this.tcKimlikNo = route.snapshot.params.tckimlikno;
      this.itemCount = this.titleList.length;
      this.videoRequestUrl = "video-request";
      this.dynamicFormsUrl = "dynamic-form";
      this.generalEvalFormurl = "usergefd";
      this.generalInformationUrl =  "general-info";
      this.messageUrl ="message";
      this.onlineMeetingsUrl ="meetings";
      this.exerciseProgramsUrl = "exercise-programs";

  }

  ngOnInit() {

    this.patientService.getPatient(this.tcKimlikNo).subscribe(data=>{
      this.patient = data;
    });

  }



}
