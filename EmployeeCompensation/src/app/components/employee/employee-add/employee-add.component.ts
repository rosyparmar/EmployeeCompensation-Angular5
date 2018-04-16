import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service.client';
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employee = {};
  error: string;

  constructor(private _employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
  }

  addEmployee() {
    this._employeeService.createEmployee(this.employee)
      .subscribe(
        (data: any) => this.router.navigate(['employees']),
        (error: any) => this.error = error._body
      );
  }
}
