import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import notify from 'devextreme/ui/notify';
import { PatientService } from 'src/app/shared/services/patient.service';
import {PatientDetails} from "../../../models/patientdetails"

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {

  dataSource: PatientDetails[];
  generalEvalFormurl:string;

  constructor(private patientService:PatientService,private router:Router) {
      this.dataSource;
      this.generalEvalFormurl = "../exercises";

  }
  ngOnInit(){
    this.getItemsList();

  }


  getItemsList = ()=>{
    this.patientService.getAll().subscribe(
      (data)=>{
        //console.log("Service data:", data);
        this.dataSource = data;
      },
      (error)=>{
        notify(error);
      }
    );
  }



  viewButtonClick = (e) =>{
    console.log("butona basildi");
    this.router.navigate(['doctor/patient-info/',e.row.data.tcKimlikNo]);
    //this.generalEvalFormurl = "../exercises";
  }

  okClicked (e) {
    notify("The OK button was clicked")
}

}
