import { Directive, ElementRef, Input, ModuleWithProviders, NgModule, OnInit, Renderer2 } from '@angular/core';

import { WuiThemeService } from './theme.service';
import { Theme } from './theme.tmpl';

@Directive({
    selector: '[wuiColor]',
})
export class WuiColorDirective {
    protected theme: Theme;

    @Input()
    set wuiColor(color: string) {
        this._updateColor(color);
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
        this.theme = _themeSvc.theme;
    }

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._themeSvc.applyTheme(this._element, this._renderer, color);
        }
    }
}

@Directive({
    selector: '[wuiBackground]',
})
export class WuiBackgroundColorDirective {
    protected theme: Theme;

    @Input()
    set wuiBackground(color: string) {
        console.log(color);
        
        this._updateColor(color);
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
        this.theme = _themeSvc.theme;
    }

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._themeSvc.applyBackground(this._element, this._renderer, color);
        }
    }
}

@Directive({
    selector: `[wuiBorderColor]`,
    host: {
        '[class.border-test]': 'true'
    }
})
export class WuiBorderColorDirective {
    protected theme: Theme;

    @Input()
    set wuiBorderColor(color: string) {
        this._updateColor(color);
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
        this.theme = _themeSvc.theme;
    }

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._themeSvc.applyStyle(this._element, this._renderer, 'border-color', color);
        }
    }
}

@Directive({
    selector: 'a[routerLink]'
})
export class WuiLinkColorDirective implements OnInit {
    theme: Theme;

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
        this.theme = _themeSvc.theme;
    }

    ngOnInit() {
        this._themeSvc.applyForeground(this._element, this._renderer, 'link');
    }
}
