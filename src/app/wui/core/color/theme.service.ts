import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Theme } from './theme';
import { THEMES } from './themes';

@Injectable()
export class WuiThemeService {
    private _theme: Theme = this._themes.getTheme('dark');

    constructor(private _themes: THEMES) {}

    set theme(data: string | Theme) {
        if (typeof data === 'string') {
            this._theme = this._themes.getTheme(data);
        } else {
            // this._theme = new Theme(data);
        }
    }

    getTheme(): Theme {
        return this._theme;
    }
}
