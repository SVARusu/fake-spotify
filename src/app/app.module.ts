import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { UIRouterModule, StateService, Transition } from "@uirouter/angular";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { rootModule } from "./router.config";
import { SpotifyService } from './services/spotify.service';
import { ListItemComponent } from './home/list-item/list-item.component';
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './search/category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent,
    ListItemComponent,
    SearchComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UIRouterModule.forRoot(rootModule)
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
