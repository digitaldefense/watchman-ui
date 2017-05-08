import { ElementRef, Inject, Injectable, Optional, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

// import { THEME } from './theme.tmpl';
import { ThemePresets } from './presets';
// import { AppConfig2 } from '../../app-config.service';

@Injectable()
export class FlThemeService {
  private _theme: any;

  set theme(value: any) { this._theme = value; }
  get theme() { return this._theme; }

  constructor(
    protected _themes: ThemePresets,
    private _element: ElementRef,
    private _renderer: Renderer2
  ) { }

  set(value: any | string) {
    console.log('svc.setTheme', value);

    if (typeof value === 'string') {
      this.theme = this._themes.getTheme(value);
    } else {
      this.theme = value;
    }

    this.applyTheme();
  }

  makeTheme() {

  }

  applyTheme() {
    const elem = this._element.nativeElement;
    const body = this._renderer.parentNode(elem);
    const bgColor = this._theme.background;
    const txtColor = this._theme.text;
    const base = this._theme.base;

    this._renderer.setStyle(body, 'background-color', bgColor);
    this._renderer.setStyle(body, 'color', txtColor);
    this._renderer.addClass(body, `fl-theme-${base}`);
  }

  /** Apply provided theme property as text color */
  applyColor(element: any, renderer: any, color: string) {
    const elem = element.nativeElement;
    const newColor = this._isCustomColor(color) ? color : this.theme[color];
    renderer.setStyle(elem, 'color', newColor);
  }

  /** Apply provided theme property as background color */
  applyBgColor(element: any, renderer: any, color: string) {
    const elem = element.nativeElement;
    const newColor = this._isCustomColor(color) ? color : this.theme[color];
    renderer.setStyle(elem, 'background-color', newColor);
  }

  private _isCustomColor(color: string): boolean {
    return (color.charAt(0) === '#');
  }
}
