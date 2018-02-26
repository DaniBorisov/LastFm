import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';

import { Song } from './song';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


// const LastFM = require('last-fm');
// const lastfm =
//  new LastFM('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5');

@Injectable()
export class SongService {

  private SongsUrl =
  'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getSongs(): Observable<Song[]> {
    this.messageService.add('SongService: fetched Songs');
     return this.http.get<Song[]>(this.SongsUrl).pipe(
      tap(songs => this.log(`fetched songs`)),
      catchError(this.handleError('getSongs', []))
    );

  }
  getSong(id: number): Observable<Song> {
    const url = `${this.SongsUrl}/${id}`;
    return this.http.get<Song>(url);
  }

  // getSong(id: number): Observable<Song> {
  //   this.messageService.add(`SongService: fetched song id=${id}`);
  //   return of(SongService.find(song => song.id === id));
  // }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
