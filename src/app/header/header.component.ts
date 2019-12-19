import { Component, OnInit, Inject } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchList: any[] = [];
  search: string
  constructor(private spotifyService: SpotifyService, private http: HttpClient) { }

  ngOnInit() {
  }
  searchMusic() {
    console.log(this.search);
    
    if(this.search !== ''){
      this.spotifyService.searchSpotify(this.search).subscribe((res: any) => {
        this.searchList = res.tracks.items;
        console.log(res.tracks.items);
      })
    }
    if(this.search === ''){
      this.searchList = [];
    }
  }
  userLogin() {
    this.spotifyService.createSpotifyApi();
  }
  testingStuff(){
    this.spotifyService.getPlaylist();
  }
}
