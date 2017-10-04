import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
      let cpHeaders = new Headers({ 'Context-Type': 'application/json' });
      let myParams: URLSearchParams = new URLSearchParams();
      myParams.set('username', JSON.stringify(username));
      myParams.set('password', JSON.stringify(password));
      let options = new RequestOptions({ search: myParams });
        return this.http.get('http://localhost:8080/login?username=' + username + '&password=' + password )
            .map(_body => {
                let user = _body.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
