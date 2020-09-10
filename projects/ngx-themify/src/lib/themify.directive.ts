import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subject} from "rxjs";
import {ThemifyService} from "./themify.service";
import {DOCUMENT} from "@angular/common";
import {takeUntil} from "rxjs/operators";
import {Theme} from "./theme";

@Directive({
  selector: '[themify]'
})
export class ThemifyDirective implements OnInit, OnDestroy{

  @Input() scoped = false;

  private _destroy$ = new Subject();
  private _currentTheme: string;

  constructor(
    private renderer: Renderer2,
    private _elementRef: ElementRef,
    private _themeService: ThemifyService,
    @Inject(DOCUMENT) private _document: any
  ) {}

  ngOnInit() {
    const activeTheme = this._themeService.getActiveTheme();
    console.log("Directive Init Theme",activeTheme)
    if (activeTheme) {
      this.updateTheme(activeTheme);
    }

    this._themeService.$themeChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }


  updateTheme(theme: Theme) {
    if (!this.scoped) {
      console.log("Update Theme", theme)
      const element = this._document.body;
      // project properties onto the element
      for (const key in theme.properties) {
        element.style.setProperty(key, theme.properties[key]);
      }
      element.classList.remove(`${this._currentTheme}-theme`);
      element.classList.add(`${theme.name}-theme`);
    } else {
      console.log("Update Theme", theme)
      const element = this._elementRef.nativeElement;
      // project properties onto the element
      for (const key in theme.properties) {
        this.renderer.setStyle(element, key, theme.properties[key]);
      }
      this.renderer.removeClass(element, `${this._currentTheme}-theme`);
      this.renderer.addClass(element, `${theme.name}-theme`)
    }
    this._currentTheme = theme.name;
  }

  /**
   * Element to attach the styles to.
   */
  getElement() {
    return this.scoped ? this._elementRef.nativeElement : this._document.body;
  }

}
