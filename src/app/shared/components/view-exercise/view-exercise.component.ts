import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import notify from "devextreme/ui/notify";
import {ExerciseService} from "../../services/exercise.service";
import {Exercise} from "../../../models/exercise/exercise";

@Component({
  selector: 'app-view-exercise-component',
  templateUrl: 'view-exercise.component.html',
  styleUrls: ['./view-exercise.component.scss']
})

export class ViewExerciseComponent implements OnInit{

  isVisible: boolean;
  popUpContent:any;
  exercise:Exercise;
  title:any;

  constructor(private exerciseService: ExerciseService ) {
  }

  ngOnInit(): void {
    // this.exerciseService.getById(this.idOfExercise).subscribe(
    //   (data)=>{
    //   },
    //   (error)=>{
    //     notify(error);
    //   }
    // );
  }

  openPopUp = (exercise: Exercise)=>{
    this.exercise = exercise;
    this.title = "Egzersiz - "+exercise.exerciseName;
    this.isVisible = true;

  }

  closePopUp = ()=>{
    this.isVisible = false;
  }
}
