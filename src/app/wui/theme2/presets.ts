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
        highlight: PALETTE.gray['300'],
        text: `rgba(${black}, 0.87)`,
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        icon: `rgba(${black}, 0.64)`,
        icons: `rgba(${black}, 0.64)`,
        toolbar: PALETTE.gray['100'],
        hover: `rgba(${black}, 0.04)`,
        card: 'white',
        dialog: 'white',
        divider: black12,
        disabled: `rgba(${black}, 0.38)`,
        disabledBtnBg: black12,
        hintText: `rgba(${black}, 0.38)`,
        secondaryText: `rgba(${black}, 0.54)`,
    },
    dark: {
        background: '#303030',
        highlight: PALETTE.gray['800'],
        text: 'white',
        success: PALETTE.green['500'],
        warning: PALETTE.amber['500'],
        danger: PALETTE.red['500'],
        icon: 'white',
        icons: 'white',
        toolbar: PALETTE.gray['900'],
        hover: `rgba(${white}, 0.04)`,
        card: PALETTE.gray['800'],
        dialog: PALETTE.gray['800'],
        divider: white12,
        disabled: white3,
        disabledBtnBg: white12,
        hintText: `rgba(${white}, 0.3)`,
        secondaryText: `rgba(${white}, 0.6)`,
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
        // success: PALETTE.green['500'],
        // warning: PALETTE.amber['500'],
        // danger: PALETTE.red['500'],
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
        // success: PALETTE.green['500'],
        // warning: PALETTE.amber['500'],
        // danger: PALETTE.red['500'],
        // background: BaseThemes.dark.background,
        // foreground: BaseThemes.dark.text,
        link: PALETTE.blue['500']
    };

    gray(value: string) {
        return PALETTE.gray[value];
    }

    getTheme(name: string) {
        // load a default theme if none is specified
        if (name == null || !name.length) {
            name = this._preset;
        }

        return this._buildTheme(name);

        // const topcoat = this[name];
        // const base = BaseThemes[topcoat.base];
        // const theme = Object.assign({}, topcoat, base);
        // return theme;

    }

    private _buildTheme(val: string) {
        let topcoat, base, theme;
        if (val === 'light' || val === 'dark') {
            topcoat = this[val];
            base = BaseThemes[topcoat.base];
        } else {
            const parts: string[] = val.split('-');
            const primary = parts[0];
            const accent = parts[1];
            const basePart = parts[2];
            topcoat = {
                'base': basePart || 'light',
                'primary': PALETTE[primary]['500'],
                'accent': PALETTE[accent]['A200'],
                'accentLight': PALETTE[accent]['A100'],
                'accentDark': PALETTE[accent]['A400'],
                'link': PALETTE[primary]['500'],
            };
            base = BaseThemes[basePart] || BaseThemes['light'];
        }

        theme = Object.assign({}, topcoat, base);
        return theme;
    }
}
