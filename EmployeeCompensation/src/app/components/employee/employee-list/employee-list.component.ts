import {Component, OnInit} from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service.client';
import {Employee} from "./employee.model";
import { SharedService } from '../../../services/shared/shared.service.client';
// import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  // providers : [EmployeeService, SharedService]
})

export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  user = {};

  constructor(private router: Router, private _employeeService: EmployeeService, private _sharedService : SharedService) {
  }



  ngOnInit() {

    this.user = this._sharedService.employee;
    this._employeeService.getEmployees()
      .subscribe(
        (data) => {
          console.log(data);
          this.employees = data; },
        (error) => console.log(error)
      );
  }


}
