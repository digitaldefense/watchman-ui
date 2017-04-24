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

    constructor(private _el: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
        this.theme = _themeSvc.theme;
    }

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._setElement(color);
        }
    }

    private _setElement(color: string) {
        const textElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'SMALL'];
        const elem = this._el.nativeElement;
        const rule = (textElements.indexOf(elem.tagName) !== -1) ? 'color' : 'background-color';
        this._renderer.setStyle(elem, rule, this.theme[color]);
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
        // this._theme.applyTheme(this._el.nativeElement);
        const elem = this._element.nativeElement;
        this._renderer.setStyle(elem, 'color', this.theme.anchorlink);
    }
}
