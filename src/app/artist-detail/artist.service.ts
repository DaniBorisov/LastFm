import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message.service';
import { SongService } from '../songs/song.service';
import { Artist } from './artist';
import { Song } from '../songs/song';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArtistService {

  private artistUrl =
  'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=93bcfc1e220302d0402898ef74fce279&format=json&mbid=';

  private artistTopTracksUrl =
  'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5&mbid=';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getArtist(mbid: string): Observable<Artist> {
    const url = `${this.artistUrl}${mbid}`;
    console.log('log ot artist service za url', url);
    return this.http.get<Artist>(url)
    .map (res => res ['artist'] as Artist);
  }

  getArtistTop(mbid: string): Observable<Song[]> {
    const url = `${this.artistTopTracksUrl}${mbid}`;
    console.log('log ot artistTOP service za url', url);
    return this.http.get(url)
    .map(res => res['toptracks']['track'] as Song[]);
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
