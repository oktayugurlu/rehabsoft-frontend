import { Component, OnInit } from '@angular/core';

import notify from 'devextreme/ui/notify';
import { PatientService } from 'src/app/shared/services/patient.service';
import {PatientDetails} from "../../../../models/patientdetails"

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  dataSource: PatientDetails;
  colCountByScreen:object;

  constructor(private patientService:PatientService) {
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
    
}

   ngOnInit(){
    this.getPatient();
  }

  getPatient = ()=>{
    this.patientService.getPatient().subscribe(
      (data)=>{
        console.log("Patient Service data:", data);
        this.dataSource = data;
      },
      (error)=>{
        notify(error);
      }
    );
  }


}
