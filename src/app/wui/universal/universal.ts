import { Directive, ElementRef, Input, ModuleWithProviders, NgModule, Renderer2 } from '@angular/core';

import { FlThemeService } from '../theme2/theme.service';

@Directive({
    selector: 'kbd[flKbd]',
})
export class KbdDirective {
    constructor(private _el: ElementRef, private _renderer: Renderer2, private _theme: FlThemeService) {
        const theme = _theme.theme;
        _theme.applyBgColor(_el, _renderer, theme['primary']);
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


const FL_DIRECTIVES = [
    // WuiContentDirective,
    KbdDirective,
    // WuiPaddingDirective
];

@NgModule({
    exports: FL_DIRECTIVES,
    declarations: FL_DIRECTIVES
})

export class FlUniversalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FlUniversalModule,
            providers: []
        };
    }
}
