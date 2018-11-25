import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }

  register(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:5000/users/register', user,  {headers: headers})
    .pipe(map(res => res));
  }

  authenticateUser(user: User) {
    this.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>('http://localhost:5000/users/login', user, {headers: headers})
    .pipe(map(res => res));
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.authToken = null;
    this.user = null;
  }
}
