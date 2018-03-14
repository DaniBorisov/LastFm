import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  private artistSimilarUrl =
  'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key=93bcfc1e220302d0402898ef74fce279&format=json&limit=5&mbid=';

  constructor(
    private http: HttpClient,
  ) {}

  getArtist(mbid: string): Observable<Artist> {
    const url = `${this.artistUrl}${mbid}`;
    console.log('URL getArtist ot artist service', url);
    return this.http.get<Artist>(url)
    .map (res => res ['artist'] as Artist);
  }

  getArtistTop(mbid: string): Observable<Song[]> {
    const url = `${this.artistTopTracksUrl}${mbid}`;
    console.log('URL artistTOP ot artist service', url);
    return this.http.get(url)
    .map(res => res['toptracks']['track'] as Song[]);
  }

  getSimilarArtist(mbid: string): Observable<Artist[]> {
    const url = `${this.artistSimilarUrl}${mbid}`;
    console.log('URL artistSIM ot artist service', url);
    return this.http.get(url)
    .map(res => res['similarartists']['artist'] as Artist[]);
  }
}
