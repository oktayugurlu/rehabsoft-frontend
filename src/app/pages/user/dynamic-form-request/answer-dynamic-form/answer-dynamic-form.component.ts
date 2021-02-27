import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenDto} from '../../../../models/tokendto';
import {AuthenticationService} from '../../../../security/authentication.service';
import {FormDynamicService} from '../../../../shared/services/formdynamic.service';
import {FormField} from '../../../../models/dynamicform/formfield';
import notify from 'devextreme/ui/notify';
import {FormFieldDefaultValue} from '../../../../models/dynamicform/formfielddefaultvalue';
import {AssignedForm} from '../../../../models/dynamicform/assignedform';

@Component({
  selector: 'app-answer-dynamic-form',
  templateUrl: './answer-dynamic-form.component.html',
  styleUrls: ['./answer-dynamic-form.component.scss']
})
export class AnswerDynamicFormComponent implements OnInit {

  username: string;
  currentUser: TokenDto;
  dataSource: FormField[];
  answers: any;
  assignedForm: AssignedForm;
  id:number;








  constructor( private authenticationService:AuthenticationService,private dynamicFormService:FormDynamicService,private router: Router,route: ActivatedRoute) {
    authenticationService.currentUser.subscribe(user=>{

      this.currentUser = user;
      this.username=JSON.parse(localStorage.getItem('currentUser')).username;
      this.answers = [];

    });

    route.parent.params.subscribe(
      (params) =>
      {
        this.id = params.formID;
      });

  }

  ngOnInit(): void {

    this.getItem();
    this.answers = [];
  }

  btnClick =  ()=> {
      console.log(this.answers);
  }

  getItem = ()=>{
    console.log(this.id);
    this.dynamicFormService.findAssignFormById(this.id).subscribe(
      (data)=>{
        this.assignedForm = data;
        console.log("data",data);
      },
      (error)=>{
        notify(error);
      }
    );
    console.log(this.assignedForm);
  }

}
