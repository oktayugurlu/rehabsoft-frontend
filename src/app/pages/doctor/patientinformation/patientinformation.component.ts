import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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


  constructor(private router: Router,route: ActivatedRoute) {
      const tcKimlikNo: string = route.snapshot.params.tckimlikno;
      console.log("PATIENTINFO tcKimlikNo:",tcKimlikNo);
      this.itemCount = this.titleList.length;
      this.videoRequestUrl = "video-request";
      this.dynamicFormsUrl = "dynamic-form";
      this.generalEvalFormurl = "usergefd";
      this.generalInformationUrl =  "general-info";
      this.messageUrl ="message";

  }

  ngOnInit() {


  }



}
