import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
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
    console.log("Update Theme", theme)
    const element = this.getElement();

    // project properties onto the element
    for (const key in theme.properties) {
      element.style.setProperty(key, theme.properties[key]);
    }

    element.classList.remove(`${this._currentTheme}-theme`);
    element.classList.add(`${theme.name}-theme`);
    this._currentTheme = theme.name;
  }

  /**
   * Element to attach the styles to.
   */
  getElement() {
    return this.scoped ? this._elementRef.nativeElement : this._document.body;
  }

}
