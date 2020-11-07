import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import {Role} from '../models/role';
import {TokenDto} from '../models/tokendto';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../security/authentication.service';

@Component({
  templateUrl: 'pages.component.html'
})

export class PagesComponent implements OnInit{
  currentUser: TokenDto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // if(this.currentUser !== null){
    //   if(this.currentUser.role === Role.User){
    //
    //     this.router.navigate(['/user']).then(() => console.log("navigate etti", this.router.getCurrentNavigation() ));
    //   }
    //   if(this.currentUser.role === Role.Doctor)
    //     this.router.navigate(['/doctor']);
    //   if(this.currentUser.role === Role.Admin)
    //     this.router.navigate(['/admin']);
    // }
    // else{
    //   this.router.navigate(['/login']);
    // }
  }
}
