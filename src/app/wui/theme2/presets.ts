import { Injectable } from '@angular/core';

import { THEME } from './theme.tmpl';
import { PALETTE } from './palette';

const black = '0, 0, 0';
const white = '255, 255, 255';

const black12 = `rgba(${black}, 0.12)`;
const white12 = `rgba(${white}, 0.12)`;
const white3 = `rgba(${white}, 0.3)`;

export const BaseThemes = {
    light: {
        background: PALETTE.gray['50'],
        text: `rgba(${black}, 0.87)`,
        icon: `rgba(${black}, 0.38)`,
        icons: `rgba(${black}, 0.38)`,
        toolbar: PALETTE.gray['100'],
        hover: `rgba(${black}, 0.04)`,
        card: 'white',
        divider: black12,
        disabled: `rgba(${black}, 0.38)`,
        disabledBtnBg: black12,
    },
    dark: {
        background: '#303030',
        text: 'white',
        icon: 'white',
        icons: 'white',
        toolbar: PALETTE.gray['900'],
        hover: `rgba(${white}, 0.04)`,
        card: PALETTE.gray['800'],
        divider: white12,
        disabled: white3,
        disabledBtnBg: white12,
    }
};

@Injectable()
export class ThemePresets {
    private _preset = 'light';

    light: THEME = {
        name: 'light',
        base: 'light',
        primary: PALETTE.blue['500'],
        accent: PALETTE.pink['A200'],
        accentLight: PALETTE.pink['A100'],
        accentDark: PALETTE.pink['A400'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        // background: BaseThemes.light.background,
        // foreground: 'black',
        link: PALETTE.blue['500']
    };
    dark: THEME = {
        name: 'dark',
        base: 'dark',
        primary: PALETTE.blue['500'],
        accent: PALETTE.pink['A200'],
        accentLight: PALETTE.pink['A100'],
        accentDark: PALETTE.pink['A400'],
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        // background: BaseThemes.dark.background,
        // foreground: BaseThemes.dark.text,
        link: PALETTE.blue['500']
    };

    getTheme(name: string) {
        if (name == null || !name.length || name === '') {
            name = this._preset;
        }

        const topcoat = this[name];
        const base = BaseThemes[topcoat.base];
        const theme = Object.assign({}, topcoat, base);
        return theme;
    }
}
