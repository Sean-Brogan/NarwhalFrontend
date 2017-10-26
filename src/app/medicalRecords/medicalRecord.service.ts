import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MedicalRecordsService {
    constructor(private http: Http) { }
 
    yourRecords(userId: number){
        return this.http.get('http://localhost:8080/all-medicalrecords?id=' + userId)
            .map(response => {
                let recordIndexes = response.json();
                if (recordIndexes) {
                    localStorage.setItem('yourRecordIndexes', JSON.stringify(recordIndexes));
                }
        });
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
}