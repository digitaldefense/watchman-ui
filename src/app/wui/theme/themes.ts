import { Injectable } from '@angular/core';

import { Theme } from './theme.tmpl';
import { PALETTE } from './palette';

@Injectable()
export class THEMES {
    light: Theme = {
        _name: 'light',
        primary: '#000',
        accent: '#111',
        success: '#222',
        warning: '#333',
        danger: '#444',
        background: '#fff',
        foreground: '#000',
        anchorlink: PALETTE.blue['500']
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
        anchorlink: PALETTE.blue['500']
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
        anchorlink: PALETTE.deepPurple['500']
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
        anchorlink: PALETTE.indigo['500']
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
        anchorlink: PALETTE.pink['500'],
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
        anchorlink: PALETTE.purple['500'],
    };
}
