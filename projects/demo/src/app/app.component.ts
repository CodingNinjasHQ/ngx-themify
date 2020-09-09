import { Component } from '@angular/core';
import {ThemifyService} from "ngx-themify";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private themify: ThemifyService) {}

  lightThme = true;

  toggleTheme() {
    if(this.lightThme){
      this.themify.applyTheme('dark')
    }
    else {
      this.themify.applyTheme('light')
    }
    this.lightThme = !this.lightThme;
  }

}
