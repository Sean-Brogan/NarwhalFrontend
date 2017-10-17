import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../user/user.service';

@Component({
    moduleId: module.id,
    template:`
      <div class="col-md-6 col-md-offset-3">
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">Records</a>
          <a routerLink="/patients" routerLinkActive="active">Patients</a>
          <a [routerLink]="['/login']">Logout</a>
        </nav>
        <h1>Hi {{currentUser.firstName}}!</h1>
        <p>Welcome to the <i>Narwhal Project</i></p>
        <p><a [routerLink]="['/login']">Logout</a></p>
      </div>
      <router-outlet></router-outlet>
    `
})

export class DashboardComponent implements OnInit {
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
