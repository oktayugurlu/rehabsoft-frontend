import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {Exercise} from "../../../../models/exercise/exercise";
import {ExerciseService} from "../../../../shared/services/exercise.service";
import notify from "devextreme/ui/notify";
import {ExerciseImage} from "../../../../models/exercise/exerciseimage";
import {ExerciseVideo} from "../../../../models/exercise/exercisevideo";
import {User} from "../../../../models/user";
import {stringify} from "@angular/compiler/src/util";
import {DxFileUploaderComponent, DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import {Role} from "../../../../models/role";
import swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-createexercise-component',
  templateUrl: 'doctor-createexercise.component.html',
  styleUrls: ['./doctor-createexercise.component.scss']
})

export class DoctorCreateExerciseComponent implements OnInit{


  @ViewChild('dxCreateExerciseFormComponent') validationFormComponent: DxFormComponent
  @ViewChild('dxFileUploaderComponent') fileUploaderComponent: DxFileUploaderComponent
  @Output() getAllExercise = new EventEmitter<void>();

  isVisible: boolean;
  popUpContent:any;
  isLoading: boolean;

  submitExercise = (e: any) => {

    //validate from outside of form example
    if (! this.validationFormComponent.instance.validate().isValid) {
      return;
    }

    this.createExerciseMediaCollection();
    console.log("fonk disi:, ", this.popUpContent.exerciseVideoCollection);

    this.isLoading = true
    this.exerciseService.save(this.popUpContent).subscribe(
      (res) => {
        this.isLoading = false;
        this.closePopUp();
        // @ts-ignore
        swal.fire({
          title: 'Başarılı !',
          icon: 'success',
          text: this.popUpContent.exerciseName+ ' Egzersizi Başarılı Bir Şekilde Eklendi! ',
          type: 'success',
          heightAuto: false
        }).then(() => {
          this.getAllExercise.next();
        });
      },
      err => {
        this.isLoading = false;
        console.log('err: ', err);
        if (err instanceof HttpErrorResponse) {
          // @ts-ignore
          swal.fire({
            title: 'Hata Oluştu !',
            text: 'Ekleme İşlemi Başarısız Oldu! ',
            type: 'error',
            heightAuto: false
          });
        }
      }
    );
///notify({ message: error, width: 300, shading: false }, "error", 1500);
  }

  createExerciseMediaCollection = ()=>{
    this.popUpContent.exerciseVideoCollection = [];
    console.log("this.filesExercise",this.filesExercise);
    this.filesExercise.forEach((file, index)=>{
      let tempExerciseVideo = new ExerciseVideo();
      tempExerciseVideo.title = stringify(index) + '-' + file.text;
      tempExerciseVideo.videoFile = file.file;
      this.popUpContent.exerciseVideoCollection.push(tempExerciseVideo);
    });
    console.log("fonk ici:, ", this.popUpContent.exerciseVideoCollection);
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

  ngOnInit(): void {

  }

  ///**** Exercise Media start ****///
  addMediaToList = (e) => {
    // stop here if form is invalid
    if (!e.validationGroup.validate().isValid) {
      return;
    }
    if (!this.isFileTypeAndSizeValid(this.fileForAddToList.file) || this.fileForAddToList.text === '' || this.fileForAddToList.file === null) {
      return;
    }
    this.filesExercise.push(this.fileForAddToList);
    this.fileForAddToList={
      id:'',
      text:'',
      file: null
    }
    this.fileUploaderComponent.instance.reset();
  }
  onDragStart(e) {
    e.itemData = e.fromData[e.fromIndex];
  }

  isFileTypeAndSizeValid = (file:any):boolean =>{
    // first number is in GB
    return (file.type.startsWith('image/') || file.type.startsWith('video/')) && file.size < 1*1000*1024*1024;
  }
  allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png',
  '.mpg', '.mp2', '.mpeg', '.mpe', '.mpv',
  '.ogg', '.mp4', '.m4p', '.m4v',
  '.avi','.wmv','.mov', '.qt','.flv', '.swf', '.avchd','.webm']

  onAdd(e) {
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  uploadMediaToAdd = (event) => {
    let now = new Date();

    let timestamp = now.getFullYear().toString(); // 2011
    timestamp += (now.getMonth() < 9 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
    timestamp += ((now.getDate() < 10) ? '0' : '') + now.getDate().toString(); // pad with a 0
    timestamp += ((now.getHours() < 10) ? '0' : '') + now.getHours().toString(); // pad with a 0
    timestamp += ((now.getMinutes() < 10) ? '0' : '') + now.getMinutes().toString(); // pad with a 0
    timestamp += ((now.getSeconds() < 10) ? '0' : '') + now.getSeconds().toString(); // pad with a 0
    timestamp += ((now.getMilliseconds() < 10) ? '0' : '') + now.getMilliseconds().toString(); // pad with a 0

    this.fileForAddToList.id = timestamp;
    console.log(event);
    this.fileForAddToList.file = event.value[0];
  }

  filesExercise:any;
  fileForAddToList:any;

  ///**** Exercise Media end ****///

  openPopUpForEdit = (data)=>{
    this.popUpContent = data;
    this.isVisible = true;
  }

  openPopUpForCreate = ()=>{
    this.popUpContent = new Exercise();
    this.filesExercise = [];
    this.fileForAddToList={
      id:'',
      text:'',
      file: null
    }
    this.isVisible = true;
  }

  closePopUp = ()=>{
    this.isVisible = false;
  }

}
