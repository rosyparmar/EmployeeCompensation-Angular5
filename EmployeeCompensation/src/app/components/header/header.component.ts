import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../../services/user/user.service.client';
import { SharedService } from '../../services/shared/shared.service.client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = {};
  flag : boolean = false;

  constructor(private router: Router, private _UserService: UserService, private _sharedService : SharedService){}

  ngOnInit(){
    console.log(this._sharedService.employee);
    if(this._sharedService.employee == ''){
      this.flag = false;
    }
    else {
      this.flag = true;
      this.user = this._sharedService.employee;
    }
  }


  logout() {
    this.flag = false;
    this._UserService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }




}
