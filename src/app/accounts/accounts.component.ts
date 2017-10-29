import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../user/user.service';
import { DatePipe } from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'account',
  templateUrl: 'accounts.component.html'
})

export class AccountsComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
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
