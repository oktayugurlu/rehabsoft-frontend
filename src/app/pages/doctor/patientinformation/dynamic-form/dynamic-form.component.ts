import {Component, OnInit} from '@angular/core';
import {AssignedForm} from '../../../../models/dynamicform/assignedform';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../shared/services/patient.service';
import {FormDynamicService} from '../../../../shared/services/formdynamic.service';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  assignedFormDto:AssignedForm;
  loading = false;
  error = '';
  assignedFormList: AssignedForm[];
  tcKimlikNo:string;
  assignFormUrl: string;

  constructor(private dynamicFormService:FormDynamicService,private router: Router,route: ActivatedRoute,private patientService:PatientService) {
    route.parent.params.subscribe(
      (params) =>
      {
        this.tcKimlikNo= params.tckimlikno;
        this.assignFormUrl = "assign-form";
      });
  }


  btnClick= function ( ) {
    let urlArray = this.router.url.split('/');
    urlArray.pop();
    this.router.navigateByUrl(  urlArray.join('/') + '/assign-form');
  };

  ngOnInit(): void {
    this.assignedFormDto = {
      creationDate: null,
      formAnswersCollection: [],
      formDynamic: null,
      isFormAnswered: null,
      patient: null,
      id: null
    },
      this.getAllAssignedForm();
  }

  getAllAssignedForm = ()=>{
    this.dynamicFormService.getAllAssigned(this.tcKimlikNo).subscribe(
      (data)=>{
        //console.log("Service data:", data);
        this.assignedFormList = data;
        console.log("Hastaya atanan formlar-anketler ", this.dynamicFormService);
      },
      (error)=>{
        notify(error);
      }
    );
  }

  isAnswered = (event) =>{
    if(event.row.data.isFormAnswered){
      return "Cevaplandı";
    }else{
      return "Cevap Bekliyor..."
    }
  }

  viewForm = (event) =>{
    let urlArray = this.router.url.split('/');
    urlArray.pop();
    this.router.navigateByUrl(  urlArray.join('/') + '/view-form/' + event.row.data.id );

  }


}
