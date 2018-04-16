/**
 * Created by Rosy Parmar on 4/14/18.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

// injecting service into module
@Injectable()
export class EmployeeService {

  baseUrl = 'http://localhost:9000';

  constructor(private _http: Http) {
  }

  createEmployee(emp) {

    console.log("In employee client side" + emp);
    var body = {
      firstName: emp.firstName,
      lastName: emp.lastName,
      dateOfJoinng: emp.dateOfJoinng,
      baseSalary: emp.baseSalary,
      deduction401: emp.deduction401,
      deductionMedical: emp.deductionMedical,
      stateTax: emp.stateTax,
      inHandPay: emp.baseSalary - (emp.deduction401 + emp.deductionMedical + emp.stateTax)
    };

    var url = this.baseUrl + '/api/createEmployee';
    console.log(url);
    return this._http.post(url, body)
      .map(
        (res: Response) => {
          const data = res.json();
          console.log("in emloyee service client");
          console.log(data);

          return data;
        }
      );
  }

  getEmployees() {
    var url = this.baseUrl + '/api/employees';
    console.log("The url" + url);
    return this._http.get(url)
      .map(
        (res: Response) => {
          const data = res.json();
          console.log("in emloyee service client");
          console.log(data);
          return data;
        }
      );

  }

  findEmployeeById(empId: String) {
    console.log("In emp service client", empId);
    console.log(this.baseUrl + '/api/employee/' + empId);
    return this._http.get(this.baseUrl + '/api/employee/' + empId)
      .map(
        (res: Response) => {
          const data = res.json();
          console.log("in emp service client", data);
          return data;
        }
      );
  }


  updateEmployee(empId, emp){
    var url = this.baseUrl + '/api/employee/' + empId;
    var body = {
      firstName: emp.firstName,
      lastName: emp.lastName,
      dateOfJoinng: emp.dateOfJoinng,
      baseSalary: emp.baseSalary,
      deduction401: emp.deduction401,
      deductionMedical: emp.deductionMedical,
      stateTax: emp.stateTax,
      inHandPay: emp.baseSalary - (emp.deduction401 + emp.deductionMedical + emp.stateTax)
    };
    return this._http.put(url, body)
      .map(
        (res: Response) => {
          const data = res;
          return data;
        }
      );
  }

  deleteEmployee(empId){
    var url = this.baseUrl + '/api/employee/' + empId;
    return this._http.delete(url)
      .map(
        (res: Response) => {
          const data = res;
          return data;
        }
      );
  }

}
