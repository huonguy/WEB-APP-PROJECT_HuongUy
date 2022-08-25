import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { DOMAIN } from '../util/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/users/login`, user);
    return ob;
  }

  register(user: User): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/users/register`, user);
    return ob;
  }

  getUserDetails(nickname: string): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/users/${nickname}`);
    return ob;
  }

  updateUserDetail(nickname: string, user: User): Observable<any> {
    let ob = this.httpClient.put(`${DOMAIN}/api/users/${nickname}`, user);
    return ob;
  }
}
