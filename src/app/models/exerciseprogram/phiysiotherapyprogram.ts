import {Doctor} from '../doctor';
import {Patient} from '../patient';
import {AddedExerciseInProgram} from './addedexerciseinprogram';

export class PhiysiotherapyProgram{
  id: number;
  creationDate : any;
  doctor : Doctor;
  goal : string;
  patient: Patient;
  isProgramActive : boolean;
  startDate : any;
  finishDate : any;
  exerciseInProgramsList: AddedExerciseInProgram[];
 }
