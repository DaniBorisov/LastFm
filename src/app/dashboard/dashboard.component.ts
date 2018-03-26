import { Component, OnInit } from '@angular/core';
import { Song } from '../songs/song';
import { SongService } from '../songs/song.service';
import { CustomMaterialModule } from '../CustomMaterialModule';

import 'hammerjs/hammer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  songs: Song[] = [];
  public searchTerms: string;

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs()
      .subscribe(songs => this.songs = songs);
      console.log('getSong ot dash', this.songs);
  }

  getresult(): void {
    if (!this.searchTerms) {
    console.log('this.searchterms ot getresult pri nqmane', this.searchTerms);
    }
    if (this.searchTerms) {
    this.songService.search(this.searchTerms)
      .subscribe(songs => {
         this.songs = songs;
         console.log('searchTerms', this.searchTerms);
         console.log('songs ot GETRESULTS', this.songs);
      });
    }
  }
}
