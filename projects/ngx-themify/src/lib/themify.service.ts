import {Inject, Injectable } from '@angular/core';
import {Theme} from "./theme";
import {ThemeConfig} from "./theme-config";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemifyService {

  private _themesStore = new Map<string, Theme>()
  private activeTheme: Theme;

  private _themeChange = new Subject<Theme>();
  public $themeChange = this._themeChange.asObservable();


  constructor(@Inject('THEME_CONFIG') private config: ThemeConfig) {
    console.log("Inject Theme", config);
    const themes = config.themes || []
    const defaultThemeName = config.defaultTheme;
    for (const theme of themes) {
      this._themesStore.set(theme.name, theme);
    }
    if (defaultThemeName) {
      this.applyTheme(defaultThemeName)
    }
  }

  public getTheme(name: string): Theme {
    return this._themesStore.get(name);
  }

  public getActiveTheme(): Theme {
    return this.activeTheme;
  }

  public setTheme(theme: Theme) {
    this._themesStore.set(theme.name, theme);
  }

  public applyTheme(name: string) {
    const theme = this._themesStore.get(name);
    if (theme) {
      this.activeTheme = theme;
      this._themeChange.next(theme);
    }
  }

  public removeTheme(name: string) {
    this._themesStore.delete(name);
  }

  public updateTheme(name: string, properties?: { [key: string]: string }) {
    const theme = this.getTheme(name) || { name, properties };
    theme.properties = {
      ...theme.properties,
      ...properties
    };
    this._themesStore.set(name, theme)
  }

}
