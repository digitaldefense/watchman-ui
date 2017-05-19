import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    Renderer2
} from '@angular/core';

// import { FlThemeService } from '../../theme/theme.service';
import { FlThemeService } from '../../theme2/theme.service';

@Directive({
    selector: '[wuiColor], [flColor]',
})
export class WuiColorDirective {
    @Input()
    set wuiColor(color: string) {
        this._updateColor(color);
    }

    @Input()
    set flColor(color: string) {
        this._updateColor(color);
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) {}

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._themeSvc.applyColor(this._element, this._renderer, color);
        }
    }
}

@Directive({
    selector: '[wuiBackground], [flBgColor]',
})
export class WuiBackgroundDirective {
    private _theme: any;

    @Input()
    set wuiBackground(color: string) {
        this._updateColor(color);
    }

    @Input()
    set flBgColor(color: string) {
        this._updateColor(color);
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) {}

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._themeSvc.applyBgColor(this._element, this._renderer, color);
        }
    }
}

@Directive({
    selector: 'a[routerLink]'
})
export class WuiLinkColorDirective implements OnInit {
    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) {}

    ngOnInit() {
        const theme = this._themeSvc.theme;
        this._renderer.setStyle(this._element.nativeElement, 'color', theme['link']);
    }
}
