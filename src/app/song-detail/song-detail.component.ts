import { Component, OnInit, Input } from '@angular/core';
import { ViewChild, SimpleChanges } from '@angular/core';
import { environment } from './../../environments/environment';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Song } from '../songs/song';
import { SongService } from '../songs/song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

 public song: Song = new Song();
 public parent = true;

  constructor(
  private route: ActivatedRoute,
  private songService: SongService,
  private location: Location
  ) { }

  ngOnInit() {
    console.log('predi getsong');
    this.getSong();
    console.log('sled get song');  }

  getSong(): void {
    const mbid = this.route.snapshot.paramMap.get('mbid');
     this.songService.getSong(mbid)
      .subscribe(song => {this.song = song;
      console.log('get song ot song.artist.mbid details', this.song); } );
  }

  goBack(): void {
    this.location.back();
  }

}
