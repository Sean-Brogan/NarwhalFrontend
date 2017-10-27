import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService }           from '../alert/alert.service';
import { AuthenticationService }  from '../authentication/authentication.service';

@Component({
    moduleId: module.id,
    template: `
      <div class="bodyLogin">
      <div class="logoIMG">
        <img src="./assets/imgs/narwhal-medical.png" />
        <h1>Narwhal Medical</h1>
      
      <form name="form" (ngSubmit)="f.form.valid && login()" #f="ngForm" novalidate>
        <div [ngClass]="{ 'has-error': f.submitted && !username.valid }">

          <label for="username"></label>
          <input type="text" placeholder="Username..." class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel"
                 required/>
          <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>

        </div>

        <div [ngClass]="{ 'has-error': f.submitted && !password.valid }">

          <label for="password"></label>
          <input type="password" placeholder="Password..." class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel"
                 required/>
          <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>

        </div>

        <div>
          <button [disabled]="loading" class="btn btn-primary">Login</button>
          <img *ngIf="loading"
               src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
        </div>

      </form>
      </div>
      </div>
    `
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                  this.alertService.error('Username or Password is incorrect');
                  this.loading = false;
                });
    }
}
