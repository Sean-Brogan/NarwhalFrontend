import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { DashboardComponent }     from './dashboard/dashboard.component';
import { LoginComponent}          from './login/login.component';
import { AlertComponent }         from './alert/alert.component';
import { AuthGuard }              from './authentication/authentication.guard';
import { AlertService }           from './alert/alert.service';
import { AuthenticationService }  from './authentication/authentication.service';
import { UserService }            from './user/user.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent
  ],
  providers: [
    UserService,
    AuthGuard,
    AlertService,
    AuthenticationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
