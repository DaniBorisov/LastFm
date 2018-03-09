import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Song } from './song';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SongService {

  private SongsUrl =
  'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json';

  private trackUrl =
  'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=93bcfc1e220302d0402898ef74fce279&format=json&mbid=';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getSongs(): Observable<Song[]> {
    return this.http.get(this.SongsUrl)
      .map(res => res['tracks']['track'] as Song[]);
  }

  getSong(name: string): Observable<Song> {
    const url = `${this.trackUrl}${name}`;
    console.log('url ot getSong song.service', url);
    return this.http.get<Song>(url)
      .map(res => res ['track'] as Song);

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
