import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results: object[];
  @Input() searchTerm$: string;

  constructor(
    private searchService: SearchService) {
    }

  ngOnInit() {
    console.log('Search predi getresults');
    this.getresult();
  }

  ngOnChange() {
    console.log('Search predi getresults ONCHANGE');
    this.getresult();
  }

  getresult(): void {
  this.searchService.search(this.searchTerm$)
    .subscribe(results => this.results = results);
    console.log('results Getresult ot Search', this.results);
  }
}

