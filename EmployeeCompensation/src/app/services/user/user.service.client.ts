/**
 * Created by Rosy Parmar on 4/14/18.
 */
import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import {SharedService} from '../shared/shared.service.client';
import {Router} from "@angular/router";


// injecting service into module
@Injectable()
export class UserService {

  baseUrl = 'http://localhost:9000';
  options = new RequestOptions();

  constructor(private _http: Http, private _sharedService : SharedService, private router: Router) {
  }


  createUser(username, password) {

    this.options.withCredentials = true;

    var body = {
      username: username,
      password: password,
    };

    var url = this.baseUrl + '/api/createUser';
    console.log(url);
    return this._http.post(url, body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          console.log("the output from server at client" + data);

          return data;
        }
      );
  }

  login(username: String, password: String) {

    this.options.withCredentials = true;

    const body = {
      username: username,
      password: password
    };

    return this._http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  logout() {
    this.options.withCredentials = true
    return this._http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const employee = res.json();
          if (employee !== '0') {
            this._sharedService.employee = employee;
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  updateEmployee(employee: any) {
    return this._http.put(this.baseUrl + '/api/employee/' + employee._id, employee)
      .map(
        (res: Response) => {
          return 'Updated';
        }
      );

  }

  findUserByEmployee(employeeId: Number) {
    return this._http.get(this.baseUrl + '/api/employee/' + employeeId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  deleteEmployee(employeeId){
    var url = this.baseUrl + '/api/employee/' + employeeId;
    return this._http.delete(url)
      .map(
        (res: Response) => {
          const data = res;
          return data;
        }
      );
  }

}

