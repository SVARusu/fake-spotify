import { UIRouter, Transition, StateService } from '@uirouter/core';

import { Injector } from '@angular/core';
import { RootModule } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SpotifyService } from './services/spotify.service';

export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  // Configure the initial state
  // If the browser URL doesn't matches any state when the router starts,
  // go to the `hello` state by default
  // router.urlService.rules.initial({ state: "home" });
}

export const rootModule: RootModule = {
  states: [
    {
      name: 'app',
      abstract: true,
      resolve: [{
        token: 'home',
        policy: { when: 'EAGER' },
        deps: [Transition, SpotifyService, StateService],
        resolveFn: (trans, spotifyService, stateService) => {
          if(trans.params().code !== ""){
            localStorage.setItem('key', trans.params().code);
            close();
            return;
          }
          //spotifyService.postSpotify(trans.params().code);
          const params = trans.params();
          console.log(params);
          return true;
        } 
      }]
    },
    {
      name: "home",
      url: "",
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
      // resolve:[
      //   {
          
      //   }
      // ]
    },
    { name: "details", url: "/details", component: DetailsComponent }
  ],
  useHash: false
};