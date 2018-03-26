import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/window';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Last.Fm';
}
