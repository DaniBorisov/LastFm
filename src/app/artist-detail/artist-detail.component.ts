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

  @Input() artist: Artist = new Artist() ;

   private artistService: ArtistService;
   private route: ActivatedRoute;

  constructor() { }

  ngOnInit() {
    this.getArtist();
  }


  getArtist(): void {
    const mbid = this.artist;
    console.log('log ot detail za artist mbid', this.artist);
    this.artistService.getArtist(mbid + '')
      .subscribe(artist => this.artist = artist);
      console.log('log ot detail za artist', this.artist);
  }
}
