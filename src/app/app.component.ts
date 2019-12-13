import { Component } from '@angular/core';
import { StateService } from '@uirouter/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fakeSpotify';
  constructor(private stateService: StateService) { }

  ngOnInit() {
  }
}
