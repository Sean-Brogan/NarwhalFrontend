import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { MatDialogModule }from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2TableModule } from 'ng2-table/ng2-table';

import { AppComponent }           from './app.component';
import { PatientsComponent }      from './patients/patients.component';
import { DashboardComponent }     from "./dashboard/dashboard.component";
import { LoginComponent}          from './login/login.component';
import { AppRoutingModule }       from './app-routing.module';
import { DialogDiagnosis }        from './dashboard/dashboard.component'
import { DialogImmunization }     from './dashboard/dashboard.component'
import { DialogMedicalTest }      from './dashboard/dashboard.component'
import { DialogMedication }       from './dashboard/dashboard.component'
import { DialogSocialHistory }    from './dashboard/dashboard.component'
import { DialogSurgery }          from './dashboard/dashboard.component'

import { AlertComponent }         from './alert/alert.component';
import { AuthGuard }              from './authentication/authentication.guard';
import { AlertService }           from './alert/alert.service';
import { AuthenticationService }  from './authentication/authentication.service';
import { UserService }            from './user/user.service';
import { AccountsComponent }      from "./accounts/accounts.component";
import { MedicalRecordsService }  from './medicalRecords/medicalRecord.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MatDialogModule,
    BrowserAnimationsModule,
    Ng2TableModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PatientsComponent,
    AccountsComponent,
    AlertComponent,
    DialogDiagnosis,
    DialogImmunization,
    DialogMedicalTest,
    DialogMedication,
    DialogSocialHistory,
    DialogSurgery,
  ],
  providers: [
    UserService,
    MedicalRecordsService,
    AuthGuard,
    AlertService,
    AuthenticationService,
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ DialogDiagnosis, 
                     DialogImmunization, 
                     DialogMedicalTest, 
                     DialogMedication, 
                     DialogSocialHistory,
                     DialogSurgery, ]
})
export class AppModule { }
