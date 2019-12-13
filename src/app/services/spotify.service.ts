import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) { }

  searchSpotify(query: string) {
    let headers = new HttpHeaders({
      Authorization: "Bearer BQBfVG8eaZGNUxNgIcosMr7TgOZWS8ivTG1xyAAILqOE4Qd8i2yN2LurB69fUDwx7F1gHq7mqGY5H-6FYUTZNUnoz5yRn8um1tOq5k6ZcUf1TPGTgWx5XBJWKTE7Qt8YR1mfl561-CXrQpO_ZY5K1AvEJvH86Z5uUw"
    });
    let searchStr = "https://api.spotify.com/v1/search?query=" + query + "&offset=0&limit=5&type=artist";
    return this.http.get(searchStr, { headers });
  }

  postSpotify(key: string) {
    let url = "http://localhost:8000/api/token";
    let data = {
      Authorization: " Basic YzkyZmVmMDM4M2NjNDZkZGI1YWU3NzE0ZGJlODJhZGU6MzBjMDRlNzVmYjAzNDBjNWI5YjRhOGFkNmU5YWNjNzk=",
      grant_type: "authorization_code",
      code: key,
      redirect_uri: "http://localhost:4200/"
    };
    let headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      Authorization: " Basic YzkyZmVmMDM4M2NjNDZkZGI1YWU3NzE0ZGJlODJhZGU6MzBjMDRlNzVmYjAzNDBjNWI5YjRhOGFkNmU5YWNjNzk=",
    });


    this.http.post(url, data, { headers }).subscribe(map(res => {
      console.log(res)
    }))
  }
}
/*
curl -H "Authorization: Basic YzkyZmVmMDM4M2NjNDZkZGI1YWU3NzE0ZGJlODJhZGU6MzBjMDRlNzVmYjAzNDBjNWI5YjRhOGFkNmU5YWNjNzk=" -d grant_type=authorization_code -d code=AQBYM1yP5iqEBG8vhVC7YZDgy02o9JuFIC48Oip-5bJaTdOrkUceoNnlu3wiP0E5_9ANtr2b5O_X01FnDLpt1KhaMrdVaHT84C9mCnXZHvtIcNy9LqR1Qh6xRKohs-qM_EN6S4oCTIsFKDhPfMClNaU8Cn749_Cgk7bAKb2Dx64DrTz2cG5EgZgf3_k -d redirect_uri=http://localhost:4200/ https://accounts.spotify.com/api/token
 */