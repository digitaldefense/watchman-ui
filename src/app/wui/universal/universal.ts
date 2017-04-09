import { Directive, ElementRef, Input, ModuleWithProviders, NgModule, Renderer2 } from '@angular/core';

@Directive({
    selector: '[wuiColor]',
})
export class WuiColorDirective {
    private _color: string;
    private _class: string;

    @Input()
    get wuiColor(): string {
        return this._color;
    }
    set wuiColor(color: string) {
        this._updateColor(color);
    }

    constructor(private _el: ElementRef, private _renderer: Renderer2) { }

    private _updateColor(newColor: string) {
        // this._setElementColor(this._color, false);
        this._setElementColor(newColor);
        this._color = newColor;
    }

    private _setElementColor(color: string) {
        if (color != null && color !== '') {
            this._setElement(color);
        }
    }

    private _setElement(color: string) {
        const textElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN'];

        if (textElements.indexOf(this._el.nativeElement.tagName) !== -1) {
            this._class = `wui-${color}-text`;
        }
        else {
            this._class = `wui-${color}-bg`;
        }
        this._renderer.addClass(this._el.nativeElement, this._class);
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
