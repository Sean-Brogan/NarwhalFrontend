import { Component, OnInit } from '@angular/core';

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
        <a class="nav" routerLink="/dashboard" routerLinkActive="active">Records</a>
        <a class="nav" routerLink="/patients" routerLinkActive="active">Patients</a>
        <a class="current" routerLink="/accounts" routerLinkActive="active">Account</a>
        <a class="nav" [routerLink]="['/login']">Logout</a>
      </div>

      <div class="info">
        <h1>Hello, {{currentUser.firstName}}!</h1>
      
        <p>
        This is the account page where you can adjust shit on your account. Page.
        Lorem iasdfladsfskdfasdflaksjdfl;akdjsfasdf
        asd'flkjasdflkjasdf
        asdfkalsdfh
        asd
        fhas
        dlfkhasdlfhiasd
        fljhasdf;kahsdfo;aisefopiajepf8wlkfjhslpdhfaksjndf;lkjxdfl;kjasd;flkjasd
        fasod8fjalkefjlas8dfjl4inajglijsl vlaije gas
        dfh oa8wh va'oieyf psodyfaohwl;rahs;lf8ah3o;ih3LIH A'DFAO8HFL 4AL8H4A/FLKGH F
        AISDYFO8AHUS;RELFIHS;EOF8HA'Ih'[ihsas;elfiah;foiaj 4rtoa8shdvoaine; asdf;alisehfa ;f3AOfje afAsefafeae
        faefajhef;laksjdf;ozsdfijaef;.kajsdf;liasdfasdf;li
        </p>
        
        <p><a [routerLink]="['/login']">Logout</a></p>
      </div>
    </div>
      <router-outlet></router-outlet>
    `
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
