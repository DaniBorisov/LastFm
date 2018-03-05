import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../songs/song';
import { Artist } from '../artist';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SongService } from '../songs/song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
 public song: Song = new Song();



  constructor(
  private route: ActivatedRoute,
  private songService: SongService,
  private location: Location
  ) { }

  ngOnInit() {
    console.log('nedhto');
    this.getSong();
  }

  getSong(): void {
    const mbid = this.route.snapshot.paramMap.get('mbid');
     this.songService.getSong(mbid)
      .subscribe(song => {this.song = song;
      console.log(song); } );
  }

  // getArtist(): void {
  //   this.songService.getArtist()
  //     .subscribe(artist => this.artist = artist);
  //     console.log('log ot detail za artist', this.artist);
  // }

  // getArtistID(): void {
  //   this.songService.getArtist()
  //     .subscribe(artist => this.artist = artist);
  //     console.log('log ot detail za artist', this.artist);
  // }

//  getSongWithMbid(): void  {
//      this.songService.getSongsWithMbid()
//      .subscribe(artist => this.artist = artist);
//  }

  goBack(): void {
    this.location.back();
  }

}
