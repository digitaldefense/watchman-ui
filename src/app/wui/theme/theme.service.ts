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
}
