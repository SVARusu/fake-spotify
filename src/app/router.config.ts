import { Transition, StateService } from '@uirouter/core';

import { RootModule } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SpotifyService } from './services/spotify.service';
import { SearchComponent } from './search/search.component';

export const rootModule: RootModule = {
  states: [
    {
      name: 'app',
      abstract: true,
      resolve: [{
        token: 'app',
        policy: { when: 'EAGER' },
        deps: [Transition, SpotifyService, StateService],
        resolveFn: (trans: Transition, spotifyService: SpotifyService, stateService: StateService) => {
          // localStorage.clear('key');
          if(trans.params().code !== ""){
            localStorage.setItem('key', trans.params().code);
            close();
          }
          return true;
        } 
      }]
    },
    {
      name: "home",
      url: "/",
      component: HomeComponent,
      params: {
        code: ''
      }
    },
    {
      name: "spotifyResponse", 
      url: "/?code", 
      parent: 'app',
      component: HomeComponent, 
      params: {
        code: ''
      },
    },
    { name: "search", url: "/search", component: SearchComponent }
  ],
  useHash: false
};