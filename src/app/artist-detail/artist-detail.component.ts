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
  ) {  }

  ngOnInit() {
    this.getArtist();
  }

  ngOnChange() {
    location.reload();
    this.getArtist();
  }

  getArtist(): void {
    const ambid = this.route.snapshot.paramMap.get('mbid');
    if ( !(this.mbid !== '' && this.mbid != null)) {
      this.parent = true;
      console.log('Sim PARENT', this.parent);
    }
    this.artistService.getArtist(this.mbid)
      .subscribe(artist => {
        this.artist = artist;
        if (this.parent) {
          this.getSimilarArtist(ambid);
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
