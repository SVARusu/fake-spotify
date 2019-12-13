import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private stateService: StateService) { }

  ngOnInit() {
    console.log(this.stateService.params["code"]);
  }

}
