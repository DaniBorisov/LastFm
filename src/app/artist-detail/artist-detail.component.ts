import { Component, OnInit, Input } from '@angular/core';

import { ArtistService } from './artist.service';
import { Artist } from './artist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  @Input() mbid: string;
  artist: Artist;
  artists: Artist[];
  public parent = false;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getArtist();
  }

  ngOnChange() {
    this.getArtist();
  }

  getArtist(): void {
    const mbid = this.route.snapshot.paramMap.get('mbid');
    console.log('?????????????????artist.mbid ot artist-detail', mbid);
    if ( !(mbid !== '' && mbid != null)) {
      this.parent = true;
      console.log('?????????????????PARENT', this.parent);
    }
    console.log('THIS.artist.mbid ot artist-detail', this.mbid);
    this.artistService.getArtist(this.mbid)
      .subscribe(artist => {
        this.artist = artist;
        if (this.parent) {
          this.getSimilarArtist(artist['mbid']);
        }
      });
      console.log('artist ot artist-detail', this.artist);
  }

  getSimilarArtist(mbid: string): void {
    console.log('mbid  GeTSIM ot artist detail', mbid );
    this.artistService.getSimilarArtist(mbid)
      .subscribe(artists => {
        this.artists = artists;
        console.log('artists ot artist detail', this.artists);
      });
  }
}
