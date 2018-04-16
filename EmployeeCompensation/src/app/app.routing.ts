/**
 * Created by Rosy Parmar on 4/14/18.
 */

// Import components
import { ModuleWithProviders } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { LoginComponent } from './components/employee/login/login.component';
import { SignUpComponent } from './components/employee/sign-up/sign-up.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';

const APP_ROUTES: Routes = [
  {path: '', component : LoginComponent},
  {path: 'login', component : LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'employees', component: EmployeeListComponent},
  {path: 'employees/:id', component: EmployeeViewComponent},
  {path: 'employees/employee/edit', component: EmployeeAddComponent},
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
