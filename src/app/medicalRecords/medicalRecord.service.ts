import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { recordIndexDb }   from '../models/recordIndexDb';
import { UserService }   from '../user/user.service';
import { User } from '../models/user';

@Injectable()
export class MedicalRecordsService {
    constructor(
        private http: Http,
        private userService: UserService,) { }
 
    yourRecords(userId: number){
        return this.http.get('http://localhost:8080/all-medicalrecords?id=' + userId)
            .map(response => {
                let recordIndexes = response.json();
                if (recordIndexes) {
                    localStorage.setItem('yourRecordIndexes', JSON.stringify(recordIndexes));
                }
        });
    }
    
    mapRecordIndexes(yourRecords: any[]){
        for (var x = 0; x < yourRecords.length; x++) {
            this.getPatientName(yourRecords[x]);
            this.getDoctorName(yourRecords[x]);
            if (yourRecords[x].recordTypeId == 1){
                yourRecords[x].recordType = 'Diagnosis';
            }
            else if (yourRecords[x].recordTypeId == 2){
                yourRecords[x].recordType = 'Immunization'
            }
            else if (yourRecords[x].recordTypeId == 3){
                yourRecords[x].recordType = 'Medical Test'
            }
            else if (yourRecords[x].recordTypeId == 4){
                yourRecords[x].recordType = 'Medication'
            }
            else if (yourRecords[x].recordTypeId == 5){
                yourRecords[x].recordType = 'Social History'
            }
            else if (yourRecords[x].recordTypeId == 6){
                yourRecords[x].recordType = 'Surgery'
            }
        }
    }
    
    getPatientName(record: any){
        let promise = new Promise((resolve, reject) => {
                this.userService.getUserById(record.patientId.toString())
                .toPromise().then(
                    res => {
                        let tempUser = JSON.parse(localStorage.getItem('tempUser'));
                        record.patientName = `${tempUser.firstname} ${tempUser.lastname}`;
                        resolve();
                    })
        });
        return promise;
    }
    
    getDoctorName(record: any){
        let promise = new Promise((resolve, reject) => {
                this.userService.getUserById(record.doctorId.toString())
                .toPromise().then(
                    res => {
                        let tempUser = JSON.parse(localStorage.getItem('tempUser'));
                        record.doctorName = `${tempUser.firstname} ${tempUser.lastname}`;
                        resolve();
                    })
        })
        return promise;
    }

    getDiagnosis(recordId: number) {
        return this.http.get('http://localhost:8080/diagnosis?id=' + recordId)
            .map(response => {
                let mediaclTest = response.json();
                localStorage.setItem('currentRecord', JSON.stringify(mediaclTest));
        })
    }
    
    getImmunization(recordId: number){
        return this.http.get('http://localhost:8080/immunization?id=' + recordId)
            .map(response => {
                let mediaclTest = response.json();
                localStorage.setItem('currentRecord', JSON.stringify(mediaclTest));
        })
    }
    
    getMedicalTest(recordId: number){
        return this.http.get('http://localhost:8080/medicalTest?id=' + recordId)
            .map(response => {
                let mediaclTest = response.json();
                localStorage.setItem('currentRecord', JSON.stringify(mediaclTest));
        })
    }
    
    getMedication(recordId: number){
        return this.http.get('http://localhost:8080/medication?id=' + recordId)
            .map(response => {
                let medication = response.json();
                localStorage.setItem('currentRecord', JSON.stringify(medication));
        })
    }
    
    getSocialHistory(recordId: number){
        return this.http.get('http://localhost:8080/socialHistory?id=' + recordId)
            .map(response => {
                let socialHistory = response.json();
                localStorage.setItem('currentRecord', JSON.stringify(socialHistory));
        })
    }
    
    getSurgery(recordId: number){
        return this.http.get('http://localhost:8080/surgery?id=' + recordId)
            .map(response => {
                let surgery = response.json();
                localStorage.setItem('currentRecord', JSON.stringify(surgery));
        })
    }
    
    addRecordIndex(record: recordIndexDb){
        record.patientId = +record.patientId;
        record.doctorId = +record.doctorId;
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post('http://localhost:8080/medicalRecord', body, options)
            .map(res => {
                let recordId = res.json();
                if (recordId) {
                    localStorage.setItem('newId', JSON.stringify(recordId));
                }
        })
    }
    
    createDiagnosis(record: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post('http://localhost:8080/diagnosis', body, options)
            .map(res => {}).subscribe(res => {});
    }
    
    addDiagnosis(record: any, recordIndex: recordIndexDb) {
        let promise = new Promise((resolve, reject) => {
                this.addRecordIndex(recordIndex)
                .toPromise().then(
                    res => {
                        record.recordId = +JSON.parse(localStorage.getItem('newId'));
                        this.createDiagnosis(record);
                        resolve();
                    })
        })
        return promise;
    }
    
    createImmunization(record: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post('http://localhost:8080/immunization', body, options)
            .map(res => {}).subscribe(res => {});
    }
    
    addImmunization(record: any, recordIndex: recordIndexDb) {
        let promise = new Promise((resolve, reject) => {
                this.addRecordIndex(recordIndex)
                .toPromise().then(
                    res => {
                        record.recordId = +JSON.parse(localStorage.getItem('newId'));
                        this.createImmunization(record);
                        resolve();
                    })
        })
        return promise;
    }
    
    createMedicalTest(record: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post('http://localhost:8080/medicalTest', body, options)
            .map(res => {}).subscribe(res => {});
    }
    
    addMedicalTest(record: any, recordIndex: recordIndexDb) {
        let promise = new Promise((resolve, reject) => {
                this.addRecordIndex(recordIndex)
                .toPromise().then(
                    res => {
                        record.recordId = +JSON.parse(localStorage.getItem('newId'));
                        this.createMedicalTest(record);
                        resolve();
                    })
        })
        return promise;
    }
    
    createMedication(record: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post('http://localhost:8080/medication', body, options)
            .map(res => {}).subscribe(res => {});
    }
    
    addMedication(record: any, recordIndex: recordIndexDb) {
        let promise = new Promise((resolve, reject) => {
                this.addRecordIndex(recordIndex)
                .toPromise().then(
                    res => {
                        record.recordId = +JSON.parse(localStorage.getItem('newId'));
                        this.createMedication(record);
                        resolve();
                    })
        })
        return promise;
    }
    
    createSocialHistory(record: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post('http://localhost:8080/socialHistory', body, options)
            .map(res => {}).subscribe(res => {});
    }
    
    addSocialHistory(record: any, recordIndex: recordIndexDb) {
        let promise = new Promise((resolve, reject) => {
                this.addRecordIndex(recordIndex)
                .toPromise().then(
                    res => {
                        record.recordId = +JSON.parse(localStorage.getItem('newId'));
                        this.createSocialHistory(record);
                        resolve();
                    })
        })
        return promise;
    }
    
    createSurgery(record: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post('http://localhost:8080/surgery', body, options)
            .map(res => {}).subscribe(res => {});
    }
    
    addSurgery(record: any, recordIndex: recordIndexDb) {
        let promise = new Promise((resolve, reject) => {
                this.addRecordIndex(recordIndex)
                .toPromise().then(
                    res => {
                        record.recordId = +JSON.parse(localStorage.getItem('newId'));
                        this.createSurgery(record);
                        resolve();
                    })
        })
        return promise;
    }
}