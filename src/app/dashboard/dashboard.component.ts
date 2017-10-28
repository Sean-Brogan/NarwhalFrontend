import { Component, OnInit, NgModule, Inject, Compiler  } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { User } from '../models/user';
import { recordIndex }   from '../models/recordIndex';
import { recordIndexDb }   from '../models/recordIndexDb';
import { diagnosis }     from '../models/diagnosis';
import { immunization }  from '../models/immunization';
import { medicalTest }   from '../models/medicalTest';
import { medication }    from '../models/medication';
import { socialHistory } from '../models/socialHistory';
import { surgery }       from '../models/surgery';
import { MedicalRecordsService } from '../medicalRecords/medicalRecord.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    yourRecords: recordIndex[];
    currentDiagnosis: diagnosis;
    currentImmunization: immunization;
    currentMedicalTest: medicalTest;
    currentMedication: medication;
    currentSocialHistory: socialHistory;
    currentSurgery: surgery;
    permissionDoctor: boolean;
    
    constructor(
    private compiler: Compiler,
      private medicalRecordsService: MedicalRecordsService,
      public dialog: MatDialog){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
        this.yourRecords = JSON.parse(localStorage.getItem('yourRecordIndexes'));
      }
      

    ngOnInit() {
        this.compiler.clearCache();
        this.medicalRecordsService.mapRecordIndexes(this.yourRecords);
        if (this.currentUser.permissionLevel == 2){
            this.permissionDoctor = true;
        }
    }
    
    addRecord(recordTypeId: number){
        if(recordTypeId == 1){
            this.addDiagnosis();
        }
        else if(recordTypeId == 2){
            
        }
        else if(recordTypeId == 3){
            
        }
        else if(recordTypeId == 4){
            
        }
        else if(recordTypeId == 5){
            
        }
        else if(recordTypeId == 6){
            
        }
    }
    
    addDiagnosis(){
        let newDiagnosis = new diagnosis();
        let newRecordIndex = new recordIndexDb();
        newRecordIndex.recordTypeId = 1;
        newRecordIndex.recordDate = new Date().getTime();
        let dialogRef = this.dialog.open(DialogAddDiagnosis, {
            width: '500px',
            data: {record: newDiagnosis, recordIndex: newRecordIndex}
        });
        
        dialogRef.afterClosed().subscribe(result => {
            this.medicalRecordsService.addDiagnosis(result, newRecordIndex);
    });
    }
    
    openRecord(recordId: number, recordTypeId: number): void {
        if(recordTypeId == 1){
            this.UpdateDiagnosis(recordId)
        }
        else if(recordTypeId == 2){
            this.UpdateImmunization(recordId);            
        }
        else if(recordTypeId == 3){
            this.UpdateMedicalTest(recordId);            
        }
        else if(recordTypeId == 4){
            this.UpdateMedication(recordId);            
        }
        else if(recordTypeId == 5){
            this.UpdateSocialHistory(recordId);            
        }
        else if(recordTypeId == 6){
            this.UpdateSurgery(recordId);
        }
    }
    
    UpdateDiagnosis(recordId: number){
        let promise = new Promise((resolve, reject) => {
            this.medicalRecordsService.getDiagnosis(recordId)
                .toPromise().then(
                    res => {
                        this.LoadDiagnosis();
                        resolve();
                    }
                );
        })
        return promise;
    }
    
    LoadDiagnosis(){
        this.currentDiagnosis = JSON.parse(localStorage.getItem('currentRecord'));
            let dialogRef = this.dialog.open(DialogDiagnosis, {
            width: '500px',
            data: {user: this.currentUser, record: this.currentDiagnosis}
            });
    }
    
    UpdateImmunization(recordId: number){
        let promise = new Promise((resolve, reject) => {
            this.medicalRecordsService.getImmunization(recordId)
                .toPromise().then(
                    res => {
                        this.LoadImmunization();
                        resolve();
                    }
                );
        })
        return promise;
    }
    
    LoadImmunization(){
        this.currentImmunization = JSON.parse(localStorage.getItem('currentRecord'));
            let dialogRef = this.dialog.open(DialogImmunization, {
            width: '500px',
            data: {user: this.currentUser, record: this.currentImmunization}
            });
    }
    
    UpdateMedicalTest(recordId: number){
        let promise = new Promise((resolve, reject) => {
            this.medicalRecordsService.getMedicalTest(recordId)
                .toPromise().then(
                    res => {
                        this.LoadMedicalTest();
                        resolve();
                    }
                );
        })
        return promise;
    }
    
    LoadMedicalTest(){
        this.currentMedicalTest = JSON.parse(localStorage.getItem('currentRecord'));
            let dialogRef = this.dialog.open(DialogMedicalTest, {
            width: '500px',
            data: {user: this.currentUser, record: this.currentMedicalTest}
            });
    }
    
    UpdateMedication(recordId: number){
        let promise = new Promise((resolve, reject) => {
            this.medicalRecordsService.getMedication(recordId)
                .toPromise().then(
                    res => {
                        this.LoadMedication();
                        resolve();
                    }
                );
        })
        return promise;
    }
    
    LoadMedication(){
        this.currentMedication = JSON.parse(localStorage.getItem('currentRecord'));
            let dialogRef = this.dialog.open(DialogMedication, {
            width: '500px',
            data: {user: this.currentUser, record: this.currentMedication}
            });
    }
    
    UpdateSocialHistory(recordId: number){
        let promise = new Promise((resolve, reject) => {
            this.medicalRecordsService.getSocialHistory(recordId)
                .toPromise().then(
                    res => {
                        this.LoadSocialHistory();
                        resolve();
                    }
                );
        })
        return promise;
    }
    
    LoadSocialHistory(){
        this.currentSocialHistory = JSON.parse(localStorage.getItem('currentRecord'));
            let dialogRef = this.dialog.open(DialogSocialHistory, {
            width: '500px',
            data: {user: this.currentUser, record: this.currentSocialHistory}
            });
    }
    
    UpdateSurgery(recordId: number){
        let promise = new Promise((resolve, reject) => {
            this.medicalRecordsService.getSurgery(recordId)
                .toPromise().then(
                    res => {
                        this.LoadSurgery();
                        resolve();
                    }
                );
        })
        return promise;
    }
    
    LoadSurgery(){
        this.currentSurgery = JSON.parse(localStorage.getItem('currentRecord'));
            let dialogRef = this.dialog.open(DialogSurgery, {
            width: '500px',
            data: {user: this.currentUser, record: this.currentSurgery}
            });
    }    
}

@Component({
    moduleId: module.id,
    templateUrl: 'Diagnosis.html'
})

export class DialogDiagnosis {
    constructor(
        public dialogRef: MatDialogRef<DialogDiagnosis>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}

@Component({
    moduleId: module.id,
    templateUrl: 'Immunization.html'
})

export class DialogImmunization {
    constructor(
        public dialogRef: MatDialogRef<DialogImmunization>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}

@Component({
    moduleId: module.id,
    templateUrl: 'MedicalTest.html'
})

export class DialogMedicalTest {
    constructor(
        public dialogRef: MatDialogRef<DialogMedicalTest>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}

@Component({
    moduleId: module.id,
    templateUrl: 'Medication.html'
})

export class DialogMedication {
    constructor(
        public dialogRef: MatDialogRef<DialogMedication>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}

@Component({
    moduleId: module.id,
    templateUrl: 'SocialHistory.html'
})

export class DialogSocialHistory {
    constructor(
        public dialogRef: MatDialogRef<DialogSocialHistory>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}

@Component({
    moduleId: module.id,
    templateUrl: 'Surgery.html'
})

export class DialogSurgery {
    constructor(
        public dialogRef: MatDialogRef<DialogSurgery>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}

@Component({
    moduleId: module.id,
    templateUrl: 'AddDiagnosis.html'
})

export class DialogAddDiagnosis {
    constructor(
        public dialogRef: MatDialogRef<DialogAddDiagnosis>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        
        onNoClick(): void {
            this.dialogRef.close();
        }
}
