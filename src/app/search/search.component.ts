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
  // searchTerm$ = new Subject<string>();
  @Input() searchTerm$: string;

  constructor(
    private searchService: SearchService) {
      }

   ngOnInit() {
     console.log('dsadas');
      this.getresult();
   }

   ngOnChange() {
     console.log('dsadas');
     this.getresult();
   }

   getresult(): void {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => this.results = results);
      console.log('search ot search comp', this.results);
   }

}

