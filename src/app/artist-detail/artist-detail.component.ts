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

  constructor(
    private artistService: ArtistService,
  ) { }

  ngOnInit() {
    this.getArtist();
  }


  ngOnChange() {
    this.getArtist();
  }

  getArtist(): void {

    console.log('log ot detail za artist mbid', this.artist);
    this.artistService.getArtist(this.mbid)
      .subscribe(artist => this.artist = artist);
      console.log('log ot detail za artist', this.mbid);
  }
}
