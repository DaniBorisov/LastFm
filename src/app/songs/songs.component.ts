import { Component, OnInit } from '@angular/core';
import { Song } from './song';
import { SongService } from './song.service';

import {Artist} from '../artist';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {

  songs: Song[];
  artist: Artist[];

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.getSongs();
    this.getArtist();
  }

  getSongs(): void {
    this.songService.getSongs()
      .subscribe(songs => this.songs = songs);
  }

  getArtist(): void {
    this.songService.getArtist()
      .subscribe(artist => this.artist = artist);
      console.log('log ot songs za artist', this.artist);
  }
}

