import { Component, OnInit, NgModule, Inject } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../models/user';
import { recordIndex } from '../models/recordIndex';
import { UserService } from '../user/user.service';
import { MedicalRecordsService } from '../medicalRecords/medicalRecord.service';

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
              Hello, {{currentUser.firstname}}!
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
                <th>PatientId</th>
                <th>DoctorId</th>
                <th>RecordTypeId</th>
                <th>RecordDate</th>
              </tr>
              <tr *ngFor="let index of yourRecords" (click)="openRecord()">
                <td>{{ index.patientId }}</td>
                <td>{{ index.doctorId }}</td>
                <td>{{ index.recordTypeId }}</td>
                <td>{{ index.recordDate }}</td>
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
    yourRecords: recordIndex[];

    constructor(
      private userService: UserService,
      private medicalRecordsService: MedicalRecordsService,
      public dialog: MatDialog){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
        this.yourRecords = JSON.parse(localStorage.getItem('yourRecordIndexes'));
      }
      

    ngOnInit() {
        this.medicalRecordsService.yourRecords(this.currentUser.userId)
            .subscribe(
                data => {});
    }
    
    openRecord(): void {
        let dialogRef = this.dialog.open(DialogDiagnosis, {
            width: '250px',
            data: {user: this.currentUser}
        });

        dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        });
    }
}

@Component({
    moduleId: module.id,
    template:`
      <h1 mat-dialog-title>Hi {{data.user.firstname}}</h1>
      <div>
        <p>I'm showing you text</p>
      </div>
      <div mat-dialog-actions>
        <button mat-button>Ok</button>
        <button mat-button (click)="onNoClick()">No Thanks</button>
      </div>
    `
})

export class DialogDiagnosis {
    constructor(
        public dialogRef: MatDialogRef<DialogDiagnosis>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}
