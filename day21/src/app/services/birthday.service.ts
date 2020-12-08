import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Rsvp } from '../model/rsvp';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getAllRsvps(): Observable<Rsvp[]> {
    return this.http.get<Rsvp[]>(environment.apiUrl)
      .pipe(
        tap(_ => console.log('fetched rsvps')),
        catchError(this.handleError<Rsvp[]>('getAllRsvps', []))
      );
  }

  addRsvp(rsvp: Rsvp): Observable<Rsvp> {
    return this.http.post<Rsvp>(environment.apiUrl, rsvp, this.httpOptions).pipe(
      tap((newRsvp: Rsvp) => console.log(`added rsvp w/ id=${newRsvp.insertId}`)),
      catchError(this.handleError<Rsvp>('addRsvp'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }


}
