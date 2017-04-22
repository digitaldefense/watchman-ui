import { Directive, ElementRef, Input, ModuleWithProviders, NgModule, Renderer2 } from '@angular/core';

import { WuiColorService } from '../core/color/color.service';

@Directive({
    selector: '[wuiColor]',
})
export class WuiColorDirective {
    @Input()
    set wuiColor(color: string) {
        this._updateColor(color);
    }

    constructor(private _el: ElementRef, private _renderer: Renderer2, private _color: WuiColorService) { }

    private _updateColor(newColor: string) {
        this._setElementColor(newColor);
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._setElement(color);
        }
    }

    private _setElement(color: string) {
        const textElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN'];
        const elem = this._el.nativeElement;
        const rule = (textElements.indexOf(elem.tagName) !== -1) ? 'color' : 'background-color';
        this._renderer.setStyle(elem, rule, this._color[color]);
    }
}


@Directive({
    selector: '[wuiPadding]',
    host: {
        '[class.wui-padding]': 'true'
    }
})
export class WuiPaddingDirective { }


@Directive({
    selector: '[wuiContent]',
    host: {
        '[class.wui-content]': 'true'
    }
})
export class WuiContentDirective { }


const directives = [
    WuiColorDirective,
    WuiContentDirective,
    WuiPaddingDirective
]

@NgModule({
    declarations: directives,
    exports: directives
})

export class WuiUniversalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: WuiUniversalModule,
            providers: []
        };
    }
}
