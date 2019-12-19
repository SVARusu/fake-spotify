import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newReleases: any[];
  recommandationsList: any[];
  allTracks: any[] = [];
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getNewRelease().subscribe((res: any) => {
      this.newReleases = res.albums.items;
    });
    this.spotifyService.gertArtistTopTracks1().subscribe((res: any) => {
      console.log(res);
      this.addTracksToArray(res);
      
    })
  }
  addTracksToArray(tracks){
    let trackArray: any[] = []
    for (let i = 0; i < tracks.tracks.length; i++) {
      let obj = {
        artist: tracks.tracks[i].artists[0].name,
        track_name: tracks.tracks[i].name,
        image: tracks.tracks[i].album.images[0].url
      }
      trackArray.push(obj)
    }
    this.allTracks.push(trackArray);
    console.log(this.allTracks[0][0].artist);
    
  }
}
