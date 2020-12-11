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


  constructor(private router: Router,route: ActivatedRoute) {
      const tcKimlikNo: string = route.snapshot.params.tckimlikno;
      console.log("PATIENTINFO tcKimlikNo:",tcKimlikNo);
      this.itemCount = this.titleList.length;

  }

  ngOnInit() {
    this.callGeneralEvalForm();
    this.callGeneralInformation()
  }

  callGeneralEvalForm(){ //hata verirse string yaz dönüs tipi olarak
    //perform some operations
   this.generalEvalFormurl = "usergefd";
 }

 callGeneralInformation(){

  this.generalInformationUrl =  "general-info";
 }

}
