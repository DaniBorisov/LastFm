import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../songs/song';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SongService } from '../songs/song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  @Input() song: Song;
  @Input() artist;

  constructor(
  private route: ActivatedRoute,
  private songService: SongService,
  private location: Location
  ) { }

  ngOnInit() {
    this.getSong();
    this.getArtist();
    this.getArtistID();
  }

  getSong(): void {
    const name = +this.route.snapshot.paramMap.get('name');
     this.songService.getSong(name)
      .subscribe(song => this.song = song);
      console.log('log ot detail', this.song);
  }

  getArtist(): void {
    this.songService.getArtist()
      .subscribe(artist => this.artist = artist);
      console.log('log ot detail za artist', this.artist);
  }

  getArtistID(): void {
    this.songService.getArtist()
      .subscribe(artist => this.artist = artist);
      console.log('log ot detail za artist', this.artist);
  }



  goBack(): void {
    this.location.back();
  }

}
