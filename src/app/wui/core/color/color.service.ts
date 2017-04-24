import { Injectable, OnInit } from '@angular/core';

import { WuiThemeService } from '../../theme/theme.service';
import { Theme } from '../../theme/theme.tmpl';

@Injectable()
export class WuiColorService {
  private _theme: Theme;

  constructor(private _themeSvc: WuiThemeService) {
    console.log('colorSvc constructor');
    
    // this._theme = _themeSvc.getTheme();
    // console.log(this._theme);
    
  }

  // get background(): string {
  //   return this._theme.background;
  // }

  get primary(): string {
    return this._theme.primary;
  }

  get accent(): string {
    return this._theme.accent;
  }

  get success(): string {
    return this._theme.success;
  }

  get warning(): string {
    return this._theme.warning;
  }

  get danger(): string {
    return this._theme.danger;
  }
}
