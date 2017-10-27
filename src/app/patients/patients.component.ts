import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../user/user.service';

@Component({
  templateUrl:'patients.component.html'
})
export class PatientsComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}

}
