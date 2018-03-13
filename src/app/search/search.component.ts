import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Song } from '../songs/song';
import { OnChanges } from '@angular/core';

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
export class SearchComponent implements OnInit {

  // results: object[];
  searchTerms: string;
  songs: Song[];
  // private searchTerms = new Subject<string>();


  constructor(
    private searchService: SearchService) {
    }

    // search(term: string): void {
    //   this.searchTerms.next(term);
    // }

    ngOnInit(): void {
      this.getresult();
      // this.songs$ = this.searchTerms.pipe(
      //   debounceTime(300),
      //   distinctUntilChanged(),
      //   switchMap((term: string) => this.searchService.search(term)),
      // );
    }

    ngOnChange() {
      console.log('dsadsa');
      this.getresult();
    }

    getresult(): void {
      console.log('this.searchterms ot getresult', this.searchTerms);
      this.searchService.search(this.searchTerms)
        .subscribe(songs => this.songs = songs);
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




