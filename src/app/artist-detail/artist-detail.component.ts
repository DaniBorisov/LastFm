import { Component, OnInit } from '@angular/core';

import { ArtistService } from '../artist.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
   artist: Artist;

   private artistService: ArtistService;


  constructor() { }

  ngOnInit() {
  }


  getArtist(): void {
    const name = '';
    this.artistService.getArtist(name)
      .subscribe(artist => this.artist = artist);
      console.log('log ot detail za artist', this.artist);
  }
}
