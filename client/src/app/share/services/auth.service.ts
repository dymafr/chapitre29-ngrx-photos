import { Injectable  } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtToken } from '../models/jwt-token.model';
import { tap } from 'rxjs/operators/tap';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { TryRefreshToken } from '../store/actions/auth.actions';

@Injectable()
export class AuthService {
  public subscription: Subscription;

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    expireDate: null,
    token: null
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<State>
  ) {
    // this.initToken();
  }

  public initTimer() {
    return timer(2000, 5000).pipe(
      tap( () => {
        this.store.dispatch(new TryRefreshToken());
      })
    );
    //   switchMap(() => {
    //     if (localStorage.getItem('jwt')) {
    //       return this.http.get<string>('/api/auth/refresh-token').pipe(
    //         tap((token: string) => {
    //           this.jwtToken.next({
    //             isAuthenticated: true,
    //             token: token
    //           });
    //           localStorage.setItem('jwt', token);
    //         })
    //       );
    //     } else {
    //       console.log('no token to refresh');
    //       this.subscription.unsubscribe();
    //       return of(null);
    //     }
    //   })
    // ).subscribe(() => {}, err => {
    //   this.jwtToken.next({
    //     isAuthenticated: false,
    //     token: null
    //   });
    //   localStorage.removeItem('jwt');
    //   this.subscription.unsubscribe();
    // });
  }

  public refreshToken(): Observable<string> {
    return this.http.get<string>('/api/auth/refresh-token');
  }


  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: { email: string, password: string}): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials);
  }

  public logout(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }


}
