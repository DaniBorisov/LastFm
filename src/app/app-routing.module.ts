import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Router, RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:mbid', component: SongDetailComponent },
  { path: 'detail/artist/:mbid', component: ArtistDetailComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
