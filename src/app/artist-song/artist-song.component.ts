import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtistService } from '../artist-detail/artist.service';
import { Song } from '../songs/song';

@Component({
  selector: 'app-artist-song',
  templateUrl: './artist-song.component.html',
  styleUrls: ['./artist-song.component.css']
})
export class ArtistSongComponent implements OnInit {

  @Input() mbid: string;
  songs: Song[];

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getToptrackArtist();
  }

  ngOnChange() {
    this.getToptrackArtist();
  }

  getToptrackArtist(): void {
    const mbid = this.route.snapshot.paramMap.get('mbid');
    this.artistService.getArtistTop(mbid)
      .subscribe(songs => {
        this.songs = songs;
        console.log('mbid ot artist song', this.songs);
      });
  }
}
