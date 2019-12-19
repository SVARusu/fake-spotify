import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var SpotifyWebApi = require('spotify-web-api-node');
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public spotifyApi;
  public auth: string = "Bearer " + localStorage.getItem("accessToken");
  constructor(private http: HttpClient) { }

  createSpotifyApi() {
    //return this.http.get("http://localhost:8080/login");
    this.http.get("http://localhost:8080/login").subscribe((result: any) => {
      let win = window.open(result.accessUrl, 'targetWindow', 'toolbar = no, location = no, status = no, menubar = no,scrollbars = yes, resizable = yes, width = 400, height = 400, top = 200, left = 500');
      let timer = setInterval(() => {
        if (win.closed) {
          clearInterval(timer);
          this.getAccessToken(localStorage.getItem('key'))
        }
      }, 500);

    });
  }

  getAccessToken(code: string) {
    this.http.get('http://localhost:8080/callback', {
      params: {
        code
      }
    }).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      // setTimeout(() => {
      //   this.refreshToken();
      // }, 1000);
      this.refreshToken();
      setInterval(() => {
        this.refreshToken();
      }, 1600000)
    });
  }

  refreshToken() {
    let refresh_token = localStorage.getItem("refreshToken");
    this.http.get('http://localhost:8080/refresh', { params: { refresh_token } }).subscribe(result => {
      console.log(result);
    })
  }

  getPlaylist() {
    this.http.get('http://localhost:8080/userinfo').subscribe(result => {
      console.log(result);
    })
  }
  searchSpotify(query: string) {
    let headers = new HttpHeaders({
      Authorization: this.auth
    });
    let searchStr = "https://api.spotify.com/v1/search?query=" + query + "&offset=0&limit=10&type=track";
    return this.http.get(searchStr, { headers });
  }
  getNewRelease() {
    let headers = new HttpHeaders({
      Authorization: this.auth
    });
    let searchStr = "https://api.spotify.com/v1/browse/new-releases?country=RO";
    return this.http.get(searchStr, { headers });
  }

  gertArtistTopTracks1() {
    let headers = new HttpHeaders({
      Authorization: this.auth
    });
    let searchStr = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=US";
    return this.http.get(searchStr, { headers });
  }
  gertArtistTopTracks2() {
    let headers = new HttpHeaders({
      Authorization: this.auth
    });
    let searchStr = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=UK";
    return this.http.get(searchStr, { headers });
  }
  gertArtistTopTracks3() {
    let headers = new HttpHeaders({
      Authorization: this.auth
    });
    let searchStr = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=RO";
    return this.http.get(searchStr, { headers });
  }
  getCategories(){
    let headers = new HttpHeaders({
      Authorization: this.auth
    });
    let searchStr = "https://api.spotify.com/v1/browse/categories";
    return this.http.get(searchStr, { headers });
  }
}
/*
curl -H "Authorization: Basic YzkyZmVmMDM4M2NjNDZkZGI1YWU3NzE0ZGJlODJhZGU6MzBjMDRlNzVmYjAzNDBjNWI5YjRhOGFkNmU5YWNjNzk=" -d grant_type=authorization_code -d code=AQBYM1yP5iqEBG8vhVC7YZDgy02o9JuFIC48Oip-5bJaTdOrkUceoNnlu3wiP0E5_9ANtr2b5O_X01FnDLpt1KhaMrdVaHT84C9mCnXZHvtIcNy9LqR1Qh6xRKohs-qM_EN6S4oCTIsFKDhPfMClNaU8Cn749_Cgk7bAKb2Dx64DrTz2cG5EgZgf3_k -d redirect_uri=http://localhost:4200/ https://accounts.spotify.com/api/token
 */