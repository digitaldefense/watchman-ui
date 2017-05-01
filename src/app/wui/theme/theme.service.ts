import { Inject, Injectable } from '@angular/core';

import { Theme } from './theme.tmpl';
import { THEMES } from './themes';

@Injectable()
export class WuiThemeService {
  name: string;
  theme: Theme;

  constructor(@Inject('AppConfig') config, private _themes: THEMES) {
    this.name = config.name || 'light';
    this.setTheme(this.name);
  }

  setTheme(name: string): Theme {
    this.theme = this._themes[name];
    return this.theme;
  }

  /** Apply provided theme property as text color */
  applyForeground(element: any, renderer: any, color: string) {
    const elem = element.nativeElement;
    const newColor = this._isCustomColor(color) ? color : this.theme[color];
    renderer.setStyle(elem, 'color', newColor);
  }

  /** Apply provided theme property as background color */
  applyBackground(element: any, renderer: any, color: string) {
    const elem = element.nativeElement;
    const newColor = this._isCustomColor(color) ? color : this.theme[color];
    renderer.setStyle(elem, 'background-color', newColor);
  }

  /** Intelligently apply provided theme property contigent on element type */
  applyTheme(element: any, renderer: any, color: string, selectors?: string[]) {
    const textElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'SMALL', 'A'];
    const elem = element.nativeElement;
    const rule = (textElements.indexOf(elem.tagName) !== -1) ? 'color' : 'background-color';
    renderer.setStyle(elem, rule, this.theme[color]);
  }

  /** Apply theme property as provide css rule */
  applyStyle(element: any, renderer: any, rule: string, color: string) {
    const elem = element.nativeElement;
    renderer.setStyle(elem, rule, color);
  }

  private _isCustomColor(color: string): boolean {
    return (color.charAt(0) === '#');
  }
}
