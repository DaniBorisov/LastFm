import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Song } from '../songs/song';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { SearchService } from './search.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  @Input() searchTerms: string;
  public songs: Song[];

  constructor(
    private searchService: SearchService) {
    }

    ngOnInit(): void {
      console.log('onInit');
      this.getresult();
      // this.songs$ = this.searchTerms.pipe(
      //   debounceTime(300),
      //   distinctUntilChanged(),
      //   switchMap((term: string) => this.searchService.search(term)),
      // );
    }

    ngOnChanges(changes: SimpleChanges) {
      console.log('onchange');
      this.getresult();
    }

    getresult(): void {
      if (!this.searchTerms) {
      console.log('this.searchterms ot getresult pri nqmane', this.searchTerms);
      }
      if (this.searchTerms) {
      this.searchService.search(this.searchTerms)
        .subscribe(songs => {
           this.songs = songs;
           console.log('searchTerms', this.searchTerms);
           console.log('songs ot GETRESULTS', this.songs);
        });
      }
      }
  // ngOnInit() {
  //   console.log('Search predi getresults');
  //   // this.getresult();
  // }

  // ngOnChange() {
    // this.searchService.search(this.stringToSearch).subscribe(
    //   data => { this.searchSongResults = data.trackmatches.track; });
    // console.log('Search predi getresults ONCHANGE');
    // this.getresult();
}




