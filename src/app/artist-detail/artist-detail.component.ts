import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtistService } from './artist.service';
import { Artist } from './artist';

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
  ) {}

  ngOnInit() {
    this.getArtist();
  }

  ngOnChange() {
    this.reload();
    this.getArtist();
  }

  getArtist(): void {
    const artistmbid = this.route.snapshot.paramMap.get('mbid');
    if ( !(this.mbid !== '' && this.mbid != null)) {
      this.parent = true;
      console.log('Sim PARENT', this.parent);
    }
    this.artistService.getArtist(this.mbid)
      .subscribe(artist => {
        this.artist = artist;
        if (this.parent) {
          this.getSimilarArtist(artistmbid);
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

  reload(): void {
    location.reload();
  }
}
