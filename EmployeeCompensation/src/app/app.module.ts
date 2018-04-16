import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/employee/login/login.component';
import { SignUpComponent } from './components/employee/sign-up/sign-up.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';

import {HttpModule} from "@angular/http";
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { SharedService } from "./services/shared/shared.service.client";
import { EmployeeService } from "./services/employee/employee.service.client";
import { UserService } from "./services/user/user.service.client";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    FooterComponent,
    EmployeeViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    Routing
  ],
  providers: [EmployeeService, SharedService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
