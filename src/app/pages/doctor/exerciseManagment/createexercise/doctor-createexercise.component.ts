import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Exercise} from "../../../../models/exercise/exercise";
import {ExerciseService} from "../../../../shared/services/exercise.service";
import notify from "devextreme/ui/notify";
import {ExerciseImage} from "../../../../models/exercise/exerciseimage";
import {ExerciseVideo} from "../../../../models/exercise/exercisevideo";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-createexercise-component',
  templateUrl: 'doctor-createexercise.component.html',
  styleUrls: ['./doctor-createexercise.component.scss']
})

export class DoctorCreateExerciseComponent{

  isVisible: boolean;
  popUpContent:any;


  submitExercise = (e: any) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }
    this.closePopUp();
  }

  cancelExercise = (Event) => {
    this.closePopUp();
  }

  // Buton options
  yeniButtonOptions = {
    text: 'Ekle',
    icon: 'plus',
    onClick: () => {
      // this.createItem(null);
    }
  };
  cancelbuttonOption:any = { useSubmitBehavior: false, text: 'Vazgeç', onClick: (Event)=>this.cancelExercise(Event),
    width: '130px',type:"outlined"
  };

  saveButtonOption:any = { useSubmitBehavior: false, text: 'Kaydet', onClick: (Event)=>this.submitExercise(Event),
      width: '130px',type:"default", icon: 'fas fa-save'
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

  openPopUpForEdit = (data)=>{
    this.popUpContent = data;
    this.isVisible = true;
  }

  openPopUpForCreate = ()=>{
    this.popUpContent = new Exercise();
    this.isVisible = true;
  }

  closePopUp = ()=>{
    this.isVisible = false;
  }

}
