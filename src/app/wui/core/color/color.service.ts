import { Injectable, OnInit } from '@angular/core';

import { WuiThemeService } from './theme.service';
import { Theme } from './theme';

@Injectable()
export class WuiColorService {
  private _theme: Theme;

  constructor(private _themeSvc: WuiThemeService) {
    this._theme = _themeSvc.getTheme();
  }

  get background(): string {
    return this._theme.background;
  }

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
