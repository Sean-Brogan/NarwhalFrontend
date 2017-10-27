import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.get('http://localhost:8080/login?username=' + username + '&password=' + password )
            .map(response => {
                let user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
    }
}
