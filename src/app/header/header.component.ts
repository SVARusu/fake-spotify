import { Component, OnInit, Inject } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: string
  constructor(private spotifyService: SpotifyService, private http: HttpClient) { }

  ngOnInit() {
  }
  searchMusic() {
    let query = this.search;
    this.spotifyService.searchSpotify(query).subscribe(art => {
      console.log(art);
    })
  }
  userLogin() {
    // this.router.navigate(["https://accounts.spotify.com/authorize?client_id=c92fef0383cc46ddb5ae7714dbe82ade&response_type=code&redirect_uri=http://localhost:4200/"]);
    // this.document.location.href = 'https://accounts.spotify.com/authorize?client_id=c92fef0383cc46ddb5ae7714dbe82ade&response_type=code&redirect_uri=http://localhost:4200/';
    window.open('https://accounts.spotify.com/authorize?client_id=c92fef0383cc46ddb5ae7714dbe82ade&response_type=code&redirect_uri=http://localhost:4200/', 'targetWindow', 'toolbar = no, location = no, status = no, menubar = no,scrollbars = yes, resizable = yes, width = 400, height = 400, top = 200, left = 500');
    // let url = "http://localhost:8000/authorize?client_id=c92fef0383cc46ddb5ae7714dbe82ade&response_type=code&redirect_uri=https://google.com";
    // this.http.get(url).subscribe( data => {
    //   console.log(data);
    // })
  }
}
