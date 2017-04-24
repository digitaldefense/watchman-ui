import { Injectable } from '@angular/core';

import { Theme } from './theme.tmpl';
import { PALETTE } from './palette';

@Injectable()
export class THEMES {
    light: Theme = {
        _name: 'light',
        primary: PALETTE.blue['500'],
        accent: PALETTE.pink['A200'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: '#fefefe',
        foreground: '#010101',
        link: PALETTE.blue['500']
    };
    dark: Theme = {
        _name: 'dark',
        primary: PALETTE.blue['500'],
        accent: PALETTE.pink['A200'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: '#010101',
        foreground: '#fefefe',
        link: PALETTE.blue['500']
    };
    'deeppurple-amber': Theme = {
        _name: 'deeppurple-amber',
        primary: PALETTE.deepPurple['500'],
        accent: PALETTE.amber['A200'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: '#fff',
        foreground: '#000',
        link: PALETTE.deepPurple['500']
    };
    'indigo-pink': Theme = {
        _name: 'indigo-pink',
        primary: PALETTE.indigo['500'],
        accent: PALETTE.pink['A200'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: '#fff',
        foreground: '#000',
        link: PALETTE.indigo['500']
    };
    'pink-bluegray': Theme = {
        _name: 'pink-bluegray',
        primary: PALETTE.pink['500'],
        accent: PALETTE.blueGray['A200'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: '#000',
        foreground: '#fff',
        link: PALETTE.pink['500'],
    };
    'purple-green': Theme = {
        _name: 'purple-green',
        primary: PALETTE.purple['500'],
        accent: PALETTE.green['A200'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: '#000',
        foreground: '#fff',
        link: PALETTE.purple['500'],
    };
}
