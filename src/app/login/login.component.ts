import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService }           from '../alert/alert.service';
import { AuthenticationService }  from '../authentication/authentication.service';
import { MedicalRecordsService }  from '../medicalRecords/medicalRecord.service';
import { User } from '../models/user';
import { recordIndex }   from '../models/recordIndex';

@Component({
    moduleId: module.id,
    templateUrl:'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    currentUser: User;
    yourRecords: recordIndex[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private medicalRecordsService: MedicalRecordsService,) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    let promise = new Promise((resolve, reject) => {
                        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                        this.medicalRecordsService.yourRecords(this.currentUser.userId)
                        .toPromise().then(
                            res => {
                                resolve();
                                this.router.navigate([this.returnUrl]);
                            })
                    return promise;
                    });
                },
                error => {
                  this.alertService.error('Username or Password is incorrect');
                  this.loading = false;
                });
    }
}
