import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  /**
   * token string
   */
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/api/authenticte', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        // some
        const token = response.json() && response.json().token;

        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: token
          }));

          // return true to indicate succesfull login
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    // clear token and remove user from local storage
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
