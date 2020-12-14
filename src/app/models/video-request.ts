import {Patient} from "./patient";
import {Exercise} from "./exercise/exercise";
import { Doctor } from "./doctor";

export class VideoRequest {

    requestContent: string;

    requestTitle: string;

    doctor:Doctor;

    patient:Patient;

    exerciseCollection:Exercise[];

    responseVideoRequest:any;





  }
  