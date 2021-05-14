import {Exercise} from '../exercise/exercise';
import {PhiysiotherapyProgram} from './phiysiotherapyprogram';
import {ScheduledExercise} from './scheduledexercise';

export class AddedExerciseInProgram{

  id: number;
  physiotherapyProgram: PhiysiotherapyProgram;
  exercise: Exercise;
  scheduledExerciseCollection: ScheduledExercise[];

}
