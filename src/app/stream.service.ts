import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Stream } from './stream';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  TWITCH_API_KEY:string = 'zyms2ns6o0phbgjv5w6hj9gnda3tjt';
  TWITCH_API_URL:string = 'https://api.twitch.tv/kraken/search/streams';
  TWITCH_API_URL_STREAM:string = 'https://api.twitch.tv/kraken/channels';
  TWITCH_API_URL_FIST:string = 'https://api.twitch.tv/kraken/streams';
  LIMIT:string = '25';
  FIRST:string = '12';

  constructor(
    private http: HttpClient) { }

  getStreams () {

    console.log('Loading');

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/vnd.twitchtv.v5+json').set('Client-ID','zyms2ns6o0phbgjv5w6hj9gnda3tjt');

    this.LIMIT = localStorage.getItem('Limit');

    let params:string = [
      `limit=${this.FIRST}`
    ].join('&');

    let url: string = `${this.TWITCH_API_URL_FIST}?${params}`;

    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('Finish')),
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError('searchStreams', []))
      );
  }

  search (query:string) {

  	console.log('Loading');

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/vnd.twitchtv.v5+json').set('Client-ID','zyms2ns6o0phbgjv5w6hj9gnda3tjt');

    this.LIMIT = localStorage.getItem('Limit');

    let params:string = [
      `limit=${this.LIMIT}`,
      `query=${query}`
    ].join('&');

    let url: string = `${this.TWITCH_API_URL}?${params}`;

    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('Finish')),
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError('searchStreams', []))
      );
  }

  getStream (id:number) {

    console.log('Loading');

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/vnd.twitchtv.v5+json').set('Client-ID','zyms2ns6o0phbgjv5w6hj9gnda3tjt');

    let url: string = `${this.TWITCH_API_URL_STREAM}/${id}`;

    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('Finish')),
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError('searchStreams', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
