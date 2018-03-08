import { Component, OnInit, Input } from '@angular/core';

import { ArtistService } from '../artist-detail/artist.service';
import { ArtistSongs } from '../artist-song/artistSongs';

@Component({
  selector: 'app-artist-song',
  templateUrl: './artist-song.component.html',
  styleUrls: ['./artist-song.component.css']
})
export class ArtistSongComponent implements OnInit {

  @Input() mbid: string;
  songs: ArtistSongs[];

  constructor(
    private artistService: ArtistService,
  ) { }

  ngOnInit() {
    console.log('dasdasdas');
    this.getToptrackArtist();
  }

  ngOnChange() {
    this.getToptrackArtist();
  }

  getToptrackArtist(): void {
    this.artistService.getArtistTop(this.mbid)
      .subscribe(song => this.songs = song);
      console.log('mbid ot artist song', this.songs);
  }
}
