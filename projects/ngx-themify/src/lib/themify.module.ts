import {ModuleWithProviders, NgModule} from '@angular/core';
import { ThemifyDirective } from './themify.directive';
import {Themes} from "./themes";
import {CommonModule} from "@angular/common";
import {ThemifyService} from "./themify.service";



@NgModule({
  declarations: [ThemifyDirective],
  imports: [
    CommonModule
  ],
  // providers: [
  //   ThemifyService
  // ],
  exports: [ThemifyDirective]
})
export class ThemifyModule {

  public static withThemes(
    themes: Themes, defaultTheme?: string
  ): ModuleWithProviders<ThemifyModule> {
    return {
      ngModule: ThemifyModule,
      providers: [
        {
          provide: 'THEME_CONFIG', // you can also use InjectionToken
          useValue: {themes, defaultTheme}
        }
      ]
    };
  }
}
