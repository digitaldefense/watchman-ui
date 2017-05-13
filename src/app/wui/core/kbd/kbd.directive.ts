import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { FlThemeService } from '../../theme2/theme.service';

@Directive({
    selector: 'kbd[flKbd]',
})
export class KbdDirective {
    constructor(private _el: ElementRef, private _renderer: Renderer2, private _theme: FlThemeService) {
        console.log('kbd', _el.nativeElement);
        
        const theme = _theme.theme;
        _theme.applyBgColor(_el, _renderer, theme['primary']);
    }
}
