import { Component, OnInit, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { User } from '../models/user';
import { UserService } from '../user/user.service';

@Component({
    moduleId: module.id,
    template:`
      <div class="body">
        <div class="head">
          
          <a class="logo" routerLink="/dashboard" routerLinkActive="active">The Narwhal Project</a>
        </div>
          <div class="nav">
            <a class="current" routerLink="/dashboard" routerLinkActive="active">Records</a>
          <a class="nav" routerLink="/patients" routerLinkActive="active">Patients</a>
          <a class="nav" routerLink="/accounts" routerLinkActive="active">Account</a>
          <a class="nav" [routerLink]="['/login']">Logout</a>
        </div>
 
        <div class="wrapper">
          <div class="infoRecordsLeft">
            <h1>
              Hello, {{currentUser.firstName}}!
            </h1>
          </div>
          <div class="infoRecordsRight">
            <p>
              Welcome to the <i>Narwhal Project</i>. Below are your most recently modified or added medical records.
            </p>
          </div>
          <div class="tableRecords">
            <table>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Record</th>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
              <tr>
                <td>Jeff</td>
                <td>Freeman</td>
                <td>06/14/1994</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      
      <router-outlet></router-outlet>
    `
})

export class DashboardComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
      private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }
  /*
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }*/
}
