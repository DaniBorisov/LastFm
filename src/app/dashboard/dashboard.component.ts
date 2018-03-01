import { Component, OnInit } from '@angular/core';
import { Song } from '../songs/song';
import { SongService } from '../songs/song.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  songs: Song[] = [];


  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs()
      .subscribe(songs => this.songs = songs);
      console.log('get ot dash', this.songs);
  }


}
