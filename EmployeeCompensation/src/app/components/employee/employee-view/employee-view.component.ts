import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { EmployeeService } from "../../../services/employee/employee.service.client";
import {SharedService} from "../../../services/shared/shared.service.client";

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  employee = {};
  _id: String;
  error: string;
  flag = false;
  alert: string;

  constructor(private activatedRoute: ActivatedRoute, private _employeeService: EmployeeService, private router: Router, private sharedService: SharedService) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
      this.getEmployee();
    });
  }

  getEmployee(){
    this._employeeService.findEmployeeById(this._id)
      .subscribe(
        (data: any) => {
          this.employee = data; },
        (error) => console.log(error)
      );
  }

  updateEmployee() {
      this._employeeService.updateEmployee(this._id, this.employee)
        .subscribe(
          (data: any) => this.router.navigate(['/employees']),
          (error) => console.log(error)
        );
    }

  deleteEmployee(){
    this._employeeService.deleteEmployee(this._id)
      .subscribe(
        (data: any) => this.router.navigate(['/employees']),
        (error) => console.log(error)
      );
  }

}
