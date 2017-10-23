import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent }     from './login/login.component';
import { AuthGuard }          from './authentication/authentication.guard';
import { PatientsComponent } from "./patients/patients.component";
import {AccountsComponent} from "./accounts/accounts.component";


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'patients',
    component: PatientsComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to the dashboard
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
