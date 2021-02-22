import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenDto} from '../../../../models/tokendto';
import {AuthenticationService} from '../../../../security/authentication.service';
import {FormDynamicService} from '../../../../shared/services/formdynamic.service';
import {FormField} from '../../../../models/dynamicform/formfield';

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


  constructor( private authenticationService:AuthenticationService,private dynamicFormService:FormDynamicService,private router: Router,route: ActivatedRoute) {
    authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
      this.username=JSON.parse(localStorage.getItem('currentUser')).username;
    });
  }

  ngOnInit(): void {
    this.dataSource = [];
    this.answers = [];
  }

}
