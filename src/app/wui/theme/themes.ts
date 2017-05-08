import { Injectable } from '@angular/core';

import { Theme } from './theme.tmpl';
import { PALETTE } from './palette';

const BaseThemes = {
    light: {
        base: 'black',
        background: PALETTE.gray['50'],
        text: 'rgba(black, 0.87)',
        divider: 'rgba(black, 0.12)'
    },
    dark: {
        base: 'white',
        background: PALETTE.gray['900'],
        text: 'white',
        divider: 'rgba(white, 0.12)'
    }
};

@Injectable()
export class THEMES {
    light: Theme = {
        _name: 'light',
        primary: PALETTE.blue['500'],
        accent: PALETTE.pink['A200'],
        accentLight: PALETTE.pink['A100'],
        accentDark: PALETTE.pink['A400'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: BaseThemes.light.background,
        foreground: 'black',
        link: PALETTE.blue['500']
    };
    dark: Theme = {
        _name: 'dark',
        primary: PALETTE.blue['500'],
        accent: PALETTE.pink['A200'],
        accentLight: PALETTE.pink['A100'],
        accentDark: PALETTE.pink['A400'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        background: BaseThemes.dark.background,
        foreground: BaseThemes.dark.text,
        link: PALETTE.blue['500']
    };
    // 'deeppurple-amber': Theme = {
    //     _name: 'deeppurple-amber',
    //     primary: PALETTE.deepPurple['500'],
    //     accent: PALETTE.amber['A200'],
    //     accentLight: PALETTE.amber['A100'],
    //     accentDark: PALETTE.amber['A400'],
    //     success: PALETTE.green['500'],
    //     warning: PALETTE.amber['500'],
    //     danger: PALETTE.red['500'],
    //     background: '#fff',
    //     foreground: '#000',
    //     link: PALETTE.deepPurple['500']
    // };
    // 'indigo-pink': Theme = {
    //     _name: 'indigo-pink',
    //     primary: PALETTE.indigo['500'],
    //     accent: PALETTE.pink['A200'],
    //     accentLight: PALETTE.pink['A100'],
    //     accentDark: PALETTE.pink['A400'],
    //     success: PALETTE.green['500'],
    //     warning: PALETTE.amber['500'],
    //     danger: PALETTE.red['500'],
    //     background: '#fff',
    //     foreground: '#000',
    //     link: PALETTE.indigo['500']
    // };
    // 'pink-bluegray': Theme = {
    //     _name: 'pink-bluegray',
    //     primary: PALETTE.pink['500'],
    //     accent: PALETTE.blueGray['A200'],
    //     accentLight: PALETTE.blueGray['A100'],
    //     accentDark: PALETTE.blueGray['A400'],
    //     success: PALETTE.green['500'],
    //     warning: PALETTE.amber['500'],
    //     danger: PALETTE.red['500'],
    //     background: '#000',
    //     foreground: '#fff',
    //     link: PALETTE.pink['500'],
    // };
    // 'purple-green': Theme = {
    //     _name: 'purple-green',
    //     primary: PALETTE.purple['500'],
    //     accent: PALETTE.green['A200'],
    //     accentLight: PALETTE.green['A100'],
    //     accentDark: PALETTE.green['A400'],
    //     success: PALETTE.green['500'],
    //     warning: PALETTE.amber['500'],
    //     danger: PALETTE.red['500'],
    //     background: '#000',
    //     foreground: '#fff',
    //     link: PALETTE.purple['500'],
    // };
}
