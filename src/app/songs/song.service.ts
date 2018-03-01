import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';

import { Song } from './song';
import { Artist } from '../artist';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SongService {

  songs: object;
  private SongsUrl =
  'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5';

  private artistUrl =
  'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=93bcfc1e220302d0402898ef74fce279&format=json&artist=';

  private songUrl =
  ' /2.0/?method=track.getInfo&api_key=93bcfc1e220302d0402898ef74fce279&format=json&artist=';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    //   getSongs(): void {
    //     this.http
    //     .get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5')
    //     .subscribe((res: Response) => {
    //       this.songs = res.json();
    //     }
    // );

  // getSongs(): Observable<Song[]> {
  //   this.messageService.add('SongService: fetched Songs');
  //    return this.http.get<Song[]>(this.SongsUrl).pipe(
  //     tap(songs => this.log(`fetched songs`)),
  //     catchError(this.handleError('getSongs', []))
  //   );
  // }

  getSongs(): Observable<Song[]> {
    return this.http.get(this.SongsUrl)
      .map(res => res['tracks']['track'] as Song[]);
  }

   getArtistID(id: number): Observable<Song[]> {
    return this.http.get(this.SongsUrl).pipe( tap(_ => this.log(`fetched song id=${id}`)),
    catchError(this.handleError<Song>(`getSong id=${id}`)))
    .map(res => res['tracks']['track'][1]['artist'][1] as Song[]);
   }



  getSong(id: number): Observable<Song> {
    const url = `${this.SongsUrl}/${name}`;
    return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song id=${id}`)),
      catchError(this.handleError<Song>(`getSong id=${id}`))
    );
  }

  getArtist(): Observable<Artist[]> {
    return this.http.get(this.SongsUrl)
      .map(res => res['tracks']['track']['artist'] as Artist[]);
  }

  getSongsWithMbid(mbid: number): Observable<Song[]> {
    if (!mbid == null) {
      return of ([]);
    }
    return this.http.get<Song[]>(`{mbid}`).pipe(
      tap(_ => this.log(`found songs matching "${mbid}"`)),
      catchError(this.handleError<Song[]>('searchSongs', []))
    ).map(res => res['tracks']['track'] as Song[]);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('SongService: ' + message);
  }
}
