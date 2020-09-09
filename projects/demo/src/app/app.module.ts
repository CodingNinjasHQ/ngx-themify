import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import {Themes, ThemifyModule} from "ngx-themify";

export const themes: Themes = [
  {
    name: 'light',
    properties: {
      '--primary-color': '#1976d2',
      '--secondary-color': '#536390',
      '--font-color': '#424242',
      '--bg-color': '#fff',
      '--heading-color': '#292922'
    }
  },
  {
    name: 'dark',
    properties: {
      '--primary-color': '#9A97F3',
      '--secondary-color': '#818cab',
      '--font-color': '#e1e1ff',
      '--bg-color': '#161625',
      '--heading-color': '#818cab'
    }
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    ThemifyModule.withThemes(themes,'light')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
