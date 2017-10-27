import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable()
export class UserService {

    // Urls to be used in operations
    allUsersUrl = 'http://localhost:8080/all-users';
    userUrl = 'http://localhost:8080/user';

    // Create the constructor to get the Http instance
    constructor(private http: Http) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get(this.allUsersUrl)
         .map(this.extractData)
         .catch(this.handleError);
    }

    getUserById(userId: string) {
        return this.http.get('http://localhost:8080/user?id=' + userId)
            .map(response => {
                let user = response.json();
                if (user) {
                    localStorage.setItem('tempUser', JSON.stringify(user));
                }
            });
    }
    
    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
    private extractData(res: Response) {
      let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
      console.error(error.message || error);
        return Observable.throw(error.status);
    }

}
