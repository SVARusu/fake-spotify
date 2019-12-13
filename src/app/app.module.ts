import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { UIRouterModule, StateService, Transition } from "@uirouter/angular";
import { uiRouterConfigFn } from "./router.config";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { rootModule } from "./router.config";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UIRouterModule.forRoot(rootModule)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
