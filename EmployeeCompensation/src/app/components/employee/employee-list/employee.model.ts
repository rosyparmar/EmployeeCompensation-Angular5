/**
 * Created by root on 4/11/18.
 */
export class Employee {

  public firstName: String;
  public lastName: String;
  public joiningDate: Date;
  public address: String;
  public baseSalary: number;
  public deductions: number;

  constructor(fname : string, lname : string, address :  string, joiningDate : Date, salary: number, deductions : number){
    this.firstName = fname;
    this.lastName = lname;
    this.joiningDate = joiningDate;
    this.address = address;
    this.baseSalary = salary;
    this.deductions = deductions;
  }

}
