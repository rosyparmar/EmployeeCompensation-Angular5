import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user/user.service.client';
import { SharedService } from '../../../services/shared/shared.service.client';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  // providers : [UserService, SharedService]
})
export class SignUpComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  password: string;
  username: string;
  error: string;
  constructor(private router: Router, private _userService: UserService, private _sharedService : SharedService) { }

  register() {

    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;

    // call user service only if passwords match else show the same error
    if (this.password) {
      this._userService.createUser(this.username, this.password)
        .subscribe(
          (data: any) => {
            this.router.navigate(['employees']);
          },
          (error: any) => {
            console.log(error);
            this.error = error._body;
          }
        );
    } else {
      this.error = 'Passwords do not match!';
    }
  }

  ngOnInit() {
  }

}
