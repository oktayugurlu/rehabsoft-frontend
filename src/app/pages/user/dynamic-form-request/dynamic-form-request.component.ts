import {Component, OnInit} from '@angular/core';
import {VideorequestService} from '../../../shared/services/videorequest.service';
import {AuthenticationService} from '../../../security/authentication.service';
import {TokenDto} from '../../../models/tokendto';
import {AssignedForm} from '../../../models/dynamicform/assignedform';
import {FormDynamicService} from '../../../shared/services/formdynamic.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dynamic-form-request',
  templateUrl: './dynamic-form-request.component.html',
  styleUrls: ['./dynamic-form-request.component.scss']
})
export class DynamicFormRequestComponent implements OnInit {

  username: string;
  currentUser: TokenDto;
  dataSourceActive: AssignedForm[];
  dataSourceHistory: AssignedForm[];

  constructor( private authenticationService:AuthenticationService,private dynamicFormService:FormDynamicService,private router: Router,route: ActivatedRoute) {
    authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
      this.username=JSON.parse(localStorage.getItem('currentUser')).username;
    });
  }

  ngOnInit(): void {
  }

}
