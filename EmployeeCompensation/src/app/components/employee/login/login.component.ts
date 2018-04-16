import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service.client';
import { SharedService } from '../../../services/shared/shared.service.client';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers : [UserService , SharedService]
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  //properties
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private router: Router, private _userService: UserService, private _sharedService : SharedService){ }

  ngOnInit() {}

  login() {

    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    console.log('data', this.username);
    this._userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this._sharedService.employee = data;
          console.log("data" , data);
          console.log("shared employee" ,this._sharedService.employee);
          console.log("************");

          this.errorFlag = false;
          this.router.navigate(['/employees'])},
        (error: any) => {
          this.errorFlag = true;
        }
      );
  }

}
