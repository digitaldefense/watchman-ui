import { Directive, ElementRef, Input, ModuleWithProviders, NgModule, Renderer2 } from '@angular/core';

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
    WuiContentDirective,
    WuiPaddingDirective
];

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
