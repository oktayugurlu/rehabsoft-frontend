import { Component } from '@angular/core';
import {Exercise} from "../../../models/exercise/exercise";
import {ExerciseService} from "../../../shared/services/exercise.service";
import notify from "devextreme/ui/notify";

@Component({
  templateUrl: 'doctor-exerciseManagment.component.html',
  styleUrls: ['./doctor-exerciseManagment.component.scss']
})

export class DoctorExerciseManagmentComponent{

  // Buton options
  yeniButtonOptions = {
    text: 'Ekle',
    icon: 'plus',
    onClick: () => {
      // this.createItem(null);
    }
  };

  allowedPageSizesArray =  [5, 10, 15, 25, 50];
  dataSource: Exercise[];


  constructor(private exerciseService: ExerciseService ) {

    exerciseService.getAll().subscribe(
      (data)=>{
        this.dataSource = data;
      },
      (error)=>{
        notify(error);
      }
    );
  }

}
