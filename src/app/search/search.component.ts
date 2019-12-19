import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { StateService } from '@uirouter/core';
import { ICategory } from '../interfaces/category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categoriesList: ICategory[] = [];
  constructor(private spotifyService: SpotifyService, private stateService: StateService) { }

  ngOnInit() {
    this.spotifyService.getCategories().subscribe((res: any) => {
      for(let i = 0; i < res.categories.items.length; i++){
        let obj = {
          icon: res.categories.items[i].icons[0].url,
          name: res.categories.items[i].name
        }
        this.categoriesList.push(obj);
      }
      console.log(this.categoriesList);
    })
    //console.log(this.stateService.current.url);
  }

}
