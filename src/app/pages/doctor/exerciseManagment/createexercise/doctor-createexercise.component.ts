import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Exercise} from "../../../../models/exercise/exercise";
import {ExerciseService} from "../../../../shared/services/exercise.service";
import notify from "devextreme/ui/notify";
import {ExerciseImage} from "../../../../models/exercise/exerciseimage";
import {ExerciseVideo} from "../../../../models/exercise/exercisevideo";
import {User} from "../../../../models/user";
import {stringify} from "@angular/compiler/src/util";
import {DxFileUploaderComponent, DxFormComponent} from "devextreme-angular";

@Component({
  selector: 'app-createexercise-component',
  templateUrl: 'doctor-createexercise.component.html',
  styleUrls: ['./doctor-createexercise.component.scss']
})

export class DoctorCreateExerciseComponent{


  @ViewChild("dxCreateExerciseFormComponent") createExerciseFormComponent: DxFormComponent;

  isVisible: boolean;
  popUpContent:any;

  submitExercise = (e: any) => {

    console.log(this.createExerciseFormComponent);
    if (!e.validationGroup.validate().isValid) {
      return;
    }
    this.closePopUp();
  }

  cancelExercise = (Event) => {
    this.closePopUp();
  }


  cancelButtonOption = {
    text: 'Vazgeç',
    onClick: (e)=>this.cancelExercise(e),
    width: '130px',
    type: 'outlined',
  }
  submitButtonOption = {
    text: 'Kaydet',
    onClick: (e)=>this.submitExercise(e),
    width: '130px',
    type: 'default',
    icon:'fas fa-save',
  }

  constructor(private exerciseService: ExerciseService ) {

  }

  ///**** Exercise Media start ****///
  addMediaToList = (e) => {
    // stop here if form is invalid
    if (!e.validationGroup.validate().isValid) {
      return;
    }
    if (this.fileForAddToList.text === '' || this.fileForAddToList.file === null) {
      return;
    }
    this.filesExercise.push(this.fileForAddToList);
  }
  fileForAddToList={
    id:'',
    text:'',
    file: null
  }
  onDragStart(e) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onAdd(e) {
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  uploadMedia = (event) => {
    this.fileForAddToList.id = stringify(this.addMediaToList.length);
    this.fileForAddToList.file = event.value[0];
  }


  filesExercise =  [
    { id: '1', text: "Prepare 2019 Financial" , file: null},
    { id: '2', text: "Prepare 2019 Marketing Plan", file: null },
    { id: '3', text: "Update Personnel Files", file: null },
    { id: '4', text: "Review Health Insurance Options Under the Affordable Care Act", file: null }
  ];
  ///**** Exercise Media end ****///


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
