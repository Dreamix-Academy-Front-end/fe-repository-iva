import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem("auth");
  }

  login(email: string, password: string): Observable<void> {
    return of(null).pipe(
      tap(() => {
        localStorage.setItem("auth", "tkn");
        this.isLoggedSubject.next(true);
      }),
      catchError((error) => {
        this.isLoggedSubject.next(false);
        return of(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem("auth");
    this.isLoggedSubject.next(false);
  }

}
