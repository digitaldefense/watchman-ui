import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    Renderer2
} from '@angular/core';

import { WuiThemeService } from '../../theme/theme.service';

@Directive({
    selector: '[wuiColor]',
})
export class WuiColorDirective {
    @Input()
    set wuiColor(color: string) {
        this._updateColor(color);
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {}

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._themeSvc.applyForeground(this._element, this._renderer, color);
        }
    }
}

@Directive({
    selector: '[wuiBackground]',
})
export class WuiBackgroundDirective {
    @Input()
    set wuiBackground(color: string) {
        this._updateColor(color);
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {}

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
    selector: 'a[routerLink]'
})
export class WuiLinkColorDirective implements OnInit {
    constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {}

    ngOnInit() {
        this._themeSvc.applyForeground(this._element, this._renderer, 'link');
    }
}
