import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../user/user.service';

@Component({
  template:`
    <div class="body">
      <div class="head">
        <a class="logo" routerLink="/dashboard" routerLinkActive="active">The Narwhal Project</a>
      </div>
      <div class="nav">
        <a class="nav" routerLink="/dashboard" routerLinkActive="active">Records</a>
        <a class="current" routerLink="/patients" routerLinkActive="active">Patients</a>
        <a class="nav" routerLink="/accounts" routerLinkActive="active">Account</a>
        <a class="nav" [routerLink]="['/login']">Logout</a>
      </div>
      <div class="info">
      <h1>Hi {{currentUser.firstName}}!</h1>
      <p>Let's do some shit, friends.</p>
      <a href="#">Add a Record</a><br>
      <a href="#">Don't Add A Record</a>
      <p><a [routerLink]="['/login']">Logout</a></p>
    </div>
    </div>
    <router-outlet></router-outlet>
  `
})
export class PatientsComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}

}
