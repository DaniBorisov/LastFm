import { Component, OnInit, Input } from '@angular/core';

import { ArtistService } from '../artist-detail/artist.service';
import { Artist } from '../artist-detail/artist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-song',
  templateUrl: './artist-song.component.html',
  styleUrls: ['./artist-song.component.css']
})
export class ArtistSongComponent implements OnInit {

  @Input() artists: Artist[];

  private artistService: ArtistService;
  private route: ActivatedRoute;

  constructor() { }

  ngOnInit() {
    this.getToptrackArtist();
  }

  getToptrackArtist(): void {
    const mbid = this.artists;
    this.artistService.getArtistTop(mbid + '')
      .subscribe(artist => this.artists = artist);
  }
}
