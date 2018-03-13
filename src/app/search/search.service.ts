import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';

import { Song } from '../songs/song';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SearchService {

  private searchtUrl =
  'http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=93bcfc1e220302d0402898ef74fce279&format=json&track=';

  constructor(
    private http: Http
  ) { }

  search(term: string): Observable<Song[]> {
    if (!(term !== '' && term != null)) {
      console.log('log ot service za prazen', term);
      // if not search term, return empty hero array.
      return of ([]);
    }
    const url = `${this.searchtUrl}${term}`;
    console.log('log ot service ako ima term za term', term);
    console.log('log ot service ako ima term za url', url);
    return this.http.get(url)
    .map(res => res['results'] as Song[]);
  }
  // search(search: string ): Observable<Song[]> {
  //   const url = `${this.searchtUrl}${search}`;
  //   console.log('URL ot search service', url);
  //   return this.http.get(url)
  //     .map(res => res['trackmatches'] as Song[]);res.json().data
  // }
}

