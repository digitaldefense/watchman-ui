import { ElementRef, Inject, Injectable, Optional, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

// import { THEME } from './theme.tmpl';
import { ThemePresets } from './presets';
// import { AppConfig2 } from '../../app-config.service';

// const themeFactory = (presets: ThemePresets, config: AppConfig2) => {
//   return new FlThemeService(presets, config.theme);
// };

@Injectable()
export class FlThemeService {
  private _theme: any;

  set theme(value: any) { this._theme = value; }
  get theme() { return this._theme; }

  // constructor(@Inject('AppConfig') config, private _themes: ThemePresets) {
  //   const name = config.name || 'light';
  //   this.set(name);
  // }

  constructor(
    protected _themes: ThemePresets,
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {
    console.log('constructor requests injected services');
  }

  set(value: any | string) {
    console.log('svc.setTheme', value);

    if (typeof value === 'string') {
      this.theme = this._themes.getTheme(value);
    } else {
      this.theme = value;
    }
    console.log(this.theme);
    
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

    
    console.log(txtColor);
    

    this._renderer.setStyle(body, 'background-color', bgColor);
    this._renderer.setStyle(body, 'color', txtColor);
    this._renderer.addClass(body, `fl-theme-${base}`);
  }

  applyColor() {

  }

  applyBgColor() {

  }
}
