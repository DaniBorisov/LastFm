import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongService } from './songs/song.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistSongComponent } from './artist-song/artist-song.component';
import { ArtistService } from './artist-detail/artist.service';


@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    DashboardComponent,
    ArtistDetailComponent,
    ArtistSongComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SongService,
    ArtistService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
