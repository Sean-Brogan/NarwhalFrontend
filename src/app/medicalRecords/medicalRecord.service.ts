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
            .map(response =>{
                let recordIndexes = response.json();
                if (recordIndexes) {
                    localStorage.setItem('yourRecordIndexes', JSON.parse(recordIndexes));
                }
        });
    }

       
}