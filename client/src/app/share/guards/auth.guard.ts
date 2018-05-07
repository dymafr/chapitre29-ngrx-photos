import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { JwtToken } from '../models/jwt-token.model';
import { map } from 'rxjs/operators/map';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { isLoggedinSelector } from '../store/selectors/auth.selectors';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<State>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.pipe(
        take(1),
        select(isLoggedinSelector)
      );

  }
}
