import { Component, OnInit } from '@angular/core';
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

  constructor(private patientService:PatientService) {
      this.dataSource;
      
  }
  ngOnInit(){
    this.getItemsList();
  }


  getItemsList = ()=>{
    this.patientService.getAll().subscribe(
      (data)=>{
        //console.log("Service data:", data);
        this.dataSource = data;
        console.log("Data Source: ", this.dataSource[0].user.email);
      },
      (error)=>{
        notify(error);
      }
    );
  }

}
