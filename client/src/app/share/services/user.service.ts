import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { tap, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user/current');
  }

}
