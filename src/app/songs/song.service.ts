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


  private SongsUrl =
  'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5';

  private songUrl =
  'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=93bcfc1e220302d0402898ef74fce279&format=json';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }



  getSongs(): Observable<Song[]> {
    return this.http.get(this.SongsUrl)
      .map(res => res['tracks']['track'] as Song[]);
  }

  // getSong(name: string, artist: string): Observable<Song> {
  //   const url = `${this.songUrl} &artist=${artist}&track=${name}`;
  //   console.log('log ot srvice za url', url);
  //   return this.http.get<Song>(url).pipe(
  //     tap(_ => this.log(`fetched song id=${name}`)),
  //     catchError(this.handleError<Song>(`getSong id=${name}`))
  //   );
  // }

  getSong(name: string): Observable<Song> {
    const url = `${this.SongsUrl}`;
    console.log('log ot srvice za url', url);
    return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song id=${name}`)),
      catchError(this.handleError<Song>(`getSong id=${name}`))
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
