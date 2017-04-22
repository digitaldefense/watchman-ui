import { Injectable } from '@angular/core';

import { Theme } from './theme';
import { PALETTE } from './palette';

@Injectable()
export class THEMES {
    light: Theme = {
        name: 'dark',
        primary: '#000',
        accent: '#111',
        success: '#222',
        warning: '#333',
        danger: '#444',
        background: '#fff',
        foreground: '#000'
    };
    dark: Theme = {
        name: 'dark',
        primary: PALETTE.blue['500'],
        accent: PALETTE.pink['A200'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: '#000',
        foreground: '#fff'
    };

    getTheme(name: string): Theme {
        return this[name];
    }
}
