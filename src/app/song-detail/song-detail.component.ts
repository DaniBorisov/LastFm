import { Component, OnInit, Input } from '@angular/core';
import { ViewChild, SimpleChanges } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Song } from '../songs/song';
import { SongService } from '../songs/song.service';
import { ArtistService } from '../artist-detail/artist.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

@Input() mbid: string;
 public song: Song = new Song();
 public parent = false;
 public artistSongs: Song[];

  constructor(
  private route: ActivatedRoute,
  private songService: SongService,
  private artistService: ArtistService,
  private location: Location
  ) { }

  ngOnInit() {
    console.log('predi getsong');
    this.getSong();
  }

  ngOnChange(changes: SimpleChanges) {
    console.log('child');
    this.getSong();
  }

  getSong(): void {
    if ( !(this.mbid !== '' && this.mbid != null)) {
      this.parent = true;
      const mbid = this.route.snapshot.paramMap.get('mbid');
    } else {
      const mbid = this.mbid;
    }
     this.songService.getSong(mbid)
      .subscribe(song => {
        this.song = song;
        console.log('tgis.song ot getSong song-detail', this.song);
        console.log('parent flag getSong ot song detaul', this.parent);
        if (this.parent) {
          this.getToptrackArtist(song.artist['mbid']);
        }
      });
  }

  getToptrackArtist(mbid: string): void {
    console.log('mbid ot artist song', mbid );
    this.artistService.getArtistTop(mbid)
      .subscribe(songs => {
        this.artistSongs = songs;
        console.log('mbid ot artist song', this.artistSongs);
      });
  }

  goBack(): void {
    this.location.back();
  }

  reload(): void {
    location.reload();
  }
}
