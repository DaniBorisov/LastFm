import { Component, OnInit, Input } from '@angular/core';

import { ArtistService } from '../artist-detail/artist.service';
import { Artist } from '../artist-detail/artist';
import { Song } from '../songs/song';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-song',
  templateUrl: './artist-song.component.html',
  styleUrls: ['./artist-song.component.css']
})
export class ArtistSongComponent implements OnInit {

  @Input() artist: Artist[];

  private artistService: ArtistService;
  private route: ActivatedRoute;

  constructor() { }

  ngOnInit() {
  }

  getToptrackArtist(): void {
    const mbid = this.artist;
    this.artistService.getArtistTop(mbid + '')
      .subscribe(artist => this.artist = artist);
  }
}
