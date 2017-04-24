import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Theme } from '../../theme/theme.tmpl';
import { THEMES } from '../../theme/themes';
import { WuiColorService } from './color.service';

@Injectable()
export class WuiThemeService {
    private _theme: Theme;

    constructor(private _themes: THEMES, private _colorSvc: WuiColorService) {}

    initTheme(data?: string | Theme): Theme {
        if (data == null) {
            this._theme = this._themes['light'];

        } else if (typeof data === 'string') {
            this._theme = this._themes[data];
        } else {
            // this._theme = new Theme(data);
        }
        return this._theme;
    }

    // getTheme(): Theme {
    //     console.log('getTheme', this._theme);
        
    //     return this._theme;
    // }
}
