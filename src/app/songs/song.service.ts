import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from './../../environments/environment';

import { Song } from './song';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SongService {

  private SongsUrl =
  'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=' + environment.api_key + '&format=json';

  private trackUrl =
  'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=' + environment.api_key + '&format=json&mbid=';

  private searchtUrl =
  'http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=' + environment.api_key + '&format=json&track=';

  constructor(
    private http: HttpClient,
  ) {}

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

  search(term: string): Observable<Song[]> {
    if (!(term !== '' && term != null)) {
      console.log('log ot service za prazen', term);
      // if not search term, return empty song array.
      return of ([]);
    }
    const url = `${this.searchtUrl}${term}`;
    console.log('log ot service ako ima term za term', term);
    console.log('log ot service ako ima term za url', url);
    return this.http.get(url)
    .map(res => res['results']['trackmatches']['track'] as Song[]);
  }
}
