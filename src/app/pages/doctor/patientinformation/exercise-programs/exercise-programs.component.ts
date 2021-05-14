import {Component, OnInit} from '@angular/core';
import {TokenDto} from '../../../../models/tokendto';
import {PhiysiotherapyProgram} from '../../../../models/exerciseprogram/phiysiotherapyprogram';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../shared/services/patient.service';
import {AuthenticationService} from '../../../../security/authentication.service';
import notify from 'devextreme/ui/notify';
import {AssignExerciseProgramService} from '../../../../shared/services/assignexerciseprogram.service';

@Component({
  selector: 'app-exercise-programs',
  templateUrl: './exercise-programs.component.html',
  styleUrls: ['./exercise-programs.component.scss'],


})
export class ExerciseProgramsComponent implements OnInit {

  loading = false;
  error = '';
  assignedprogramList: PhiysiotherapyProgram[];
  tcKimlikNo:string;
  username: string;
  currentUser: TokenDto;
  popUpVisible: boolean;
  now:any=new Date();
  startDate:any;
  stepperActiveBooleans:any={
    isDatePicikng:false,
    isProgramCreationPicking:true
  };
  appointmentsData: Appointment[];
  currentDate: Date = new Date(2021, 4, 25);
  resourcesData: Resource[];

  nextButtonOption = {
    text: 'İleri',
    onClick: (e)=> {

    },
    width: '130px',
    type: 'default',
    icon:'fas fa-save',
  }

  constructor(private exerciseProgramService:AssignExerciseProgramService,private router: Router,route: ActivatedRoute,private patientService:PatientService, private authenticationService:AuthenticationService) {
    this.assignedprogramList = [];
    this.popUpVisible = false;
    this.appointmentsData = appointments;
    this.resourcesData = resources;
    route.parent.params.subscribe(
      (params) =>
      {
        this.tcKimlikNo= params.tckimlikno;
      });
    authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
      this.username=JSON.parse(localStorage.getItem('currentUser')).username;
    });
  }

  ngOnInit(): void {
    this.getAllAssignedExercises();
  }

  getAllAssignedExercises = ()=>{
    this.exerciseProgramService.getAllAssigned(this.tcKimlikNo).subscribe(
      (data)=>{
        //console.log("Service data:", data);
        this.assignedprogramList = data;
        console.log("Hastaya atanan egzersiz programları ", this.exerciseProgramService);
      },
      (error)=>{
        notify(error);
      }
    );
  }

  openCreateProgramPopUp(): void {
    this.popUpVisible= true;
  }



}

export class Appointment {
  text: string;
  roomId: number;
  startDate: Date;
  endDate: Date;
}

export class Resource {
  text: string;
  id: number;
  color: string;
}

let appointments: Appointment[] = [
  {
    text: "Google AdWords Strategy",
    roomId: 1,
    startDate: new Date("2021-04-30T16:00:00.000Z"),
    endDate: new Date("2021-04-30T17:30:00.000Z")
  }, {
    text: "New Brochures",
    roomId: 5,
    startDate: new Date("2021-04-30T18:30:00.000Z"),
    endDate: new Date("2021-04-30T21:15:00.000Z")
  }, {
    text: "Brochure Design Review",
    roomId: 5,
    startDate: new Date("2021-04-30T20:15:00.000Z"),
    endDate: new Date("2021-04-30T23:15:00.000Z")
  }, {
    text: "Website Re-Design Plan",
    roomId: 5,
    startDate: new Date("2021-04-30T23:45:00.000Z"),
    endDate: new Date("2021-04-30T18:15:00.000Z")
  }, {
    text: "Rollout of New Website and Marketing Brochures",
    roomId: 2,
    startDate: new Date("2021-05-04T15:15:00.000Z"),
    endDate: new Date("2021-05-04T17:45:00.000Z")
  }, {
    text: "Update Sales Strategy Documents",
    roomId: 3,
    startDate: new Date("2021-05-04T19:00:00.000Z"),
    endDate: new Date("2021-05-04T20:45:00.000Z")
  }, {
    text: "Non-Compete Agreements",
    roomId: 3,
    startDate: new Date("2021-05-04T15:15:00.000Z"),
    endDate: new Date("2021-05-04T16:00:00.000Z")
  }, {
    text: "Update NDA Agreement",
    roomId: 1,
    startDate: new Date("2021-05-05T18:45:00.000Z"),
    endDate: new Date("2021-05-05T20:45:00.000Z")
  }, {
    text: "Update Employee Files with New NDA",
    roomId: 4,
    startDate: new Date("2021-05-13T21:00:00.000Z"),
    endDate: new Date("2021-05-13T23:45:00.000Z")
  }, {
    text: "Submit Questions Regarding New NDA",
    roomId: 4,
    startDate: new Date("2021-05-13T15:00:00.000Z"),
    endDate: new Date("2021-05-13T16:30:00.000Z")
  }, {
    text: "Submit Signed NDA",
    roomId: 4,
    startDate: new Date("2021-05-13T19:45:00.000Z"),
    endDate: new Date("2021-05-13T21:00:00.000Z")
  }, {
    text: "Review Revenue Projections",
    roomId: 4,
    startDate: new Date("2021-05-21T00:15:00.000Z"),
    endDate: new Date("2021-05-21T01:00:00.000Z")
  }, {
    text: "Comment on Revenue Projections",
    roomId: 1,
    startDate: new Date("2021-05-17T16:15:00.000Z"),
    endDate: new Date("2021-05-17T18:15:00.000Z")
  }, {
    text: "Provide New Health Insurance Docs",
    roomId: 4,
    startDate: new Date("2021-05-17T19:45:00.000Z"),
    endDate: new Date("2021-05-17T21:15:00.000Z")
  }, {
    text: "Review Changes to Health Insurance Coverage",
    roomId: 4,
    startDate: new Date("2021-05-20T21:15:00.000Z"),
    endDate: new Date("2021-05-20T22:30:00.000Z")
  }, {
    text: "Review Training Course for any Omissions",
    roomId: 4,
    startDate: new Date("2021-05-17T21:00:00.000Z"),
    endDate: new Date("2021-05-17T19:00:00.000Z")
  }, {
    text: "Recall Rebate Form",
    roomId: 2,
    startDate: new Date("2021-05-18T19:45:00.000Z"),
    endDate: new Date("2021-05-18T20:15:00.000Z")
  }, {
    text: "Create Report on Customer Feedback",
    roomId: 3,
    startDate: new Date("2021-05-18T22:15:00.000Z"),
    endDate: new Date("2021-05-19T00:30:00.000Z")
  }, {
    text: "Review Customer Feedback Report",
    roomId: 3,
    startDate: new Date("2021-05-12T23:15:00.000Z"),
    endDate: new Date("2021-05-13T01:30:00.000Z")
  }, {
    text: "Customer Feedback Report Analysis",
    roomId: 3,
    startDate: new Date("2021-05-12T16:30:00.000Z"),
    endDate: new Date("2021-05-12T17:30:00.000Z")
  }, {
    text: "Prepare Shipping Cost Analysis Report",
    roomId: 3,
    startDate: new Date("2021-05-18T19:30:00.000Z"),
    endDate: new Date("2021-05-18T20:30:00.000Z")
  }, {
    text: "Provide Feedback on Shippers",
    roomId: 3,
    startDate: new Date("2021-05-18T21:15:00.000Z"),
    endDate: new Date("2021-05-18T23:00:00.000Z")
  }, {
    text: "Select Preferred Shipper",
    roomId: 1,
    startDate: new Date("2021-05-22T00:30:00.000Z"),
    endDate: new Date("2021-05-22T03:00:00.000Z")
  }, {
    text: "Complete Shipper Selection Form",
    roomId: 5,
    startDate: new Date("2021-05-20T15:30:00.000Z"),
    endDate: new Date("2021-05-20T17:00:00.000Z")
  }, {
    text: "Upgrade Server Hardware",
    roomId: 5,
    startDate: new Date("2021-05-21T19:00:00.000Z"),
    endDate: new Date("2021-05-21T21:15:00.000Z")
  }, {
    text: "Upgrade Personal Computers",
    roomId: 5,
    startDate: new Date("2021-05-21T21:45:00.000Z"),
    endDate: new Date("2021-05-21T23:30:00.000Z")
  }
];

let resources: Resource[] = [
  {
    text: "Room 401",
    id: 1,
    color: "#bbd806"
  }, {
    text: "Room 402",
    id: 2,
    color: "#f34c8a"
  }, {
    text: "Room 403",
    id: 3,
    color: "#ae7fcc"
  }, {
    text: "Room 407",
    id: 4,
    color: "#ff8817"
  }, {
    text: "Room 409",
    id: 5,
    color: "#03bb92"
  }
];

