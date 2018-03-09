import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Song } from '../songs/song';

@Injectable()
export class SearchService {

  private searchtUrl =
  'http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=93bcfc1e220302d0402898ef74fce279&format=json&track=';

  constructor(
    private http: Http
  ) { }

  search(search: string ): Observable<Song[]> {
    const url = `${this.searchtUrl}${search}`;
    console.log('log ot search service za url', url);
    return this.http.get(url)
      .map(res => res['trackmatches']['track'] as Song[]);
  }
}
