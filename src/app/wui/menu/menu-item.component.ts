import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { coerceBooleanProperty } from '../core/coercion/boolean-property';

@Component({
    selector: 'button[fl-menu-item]',
    templateUrl: 'menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    host: {
        'role': 'menuitem',
        '[class.fl-menu-item]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class FlMenuItemComponent {
    private _disabled = false;

    @Input()
    get disabled() { return this._disabled; }
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    constructor(private _element: ElementRef) {}
}
