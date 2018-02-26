import { Injectable } from '@angular/core';

import { Song } from './song';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const LastFM = require('last-fm');
const lastfm =
 new LastFM('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5');

@Injectable()
export class SongService {

  // private SongsUrl =
  // 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getSongs(): Observable<Song[]> {
    this.messageService.add('SongService: fetched Songs');
     return this.http.get<Song[]>(lastfm);

  }

  getSong(id: number): Observable<Song> {
    this.messageService.add(`SongService: fetched song id=${id}`);
    return of(Songs.find(song => song.id === id));
  }
}
