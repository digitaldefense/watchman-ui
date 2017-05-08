import { Directive } from '@angular/core';

@Directive({
    selector: '[flContent]',
    host: {
        '[class.wui-content]': 'true'
    }
})
export class FlContentDirective { }
