import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
    Overlay,
    OverlayState,
    OverlayRef,
    TemplatePortal
} from '../core';

import { FlMenuPanel } from './menu-panel.interface';

@Directive({
    selector: '[flMenuTrigger]',
    host: {
        'aria-haspopup': 'true',
        '(mousedown)': '_handleMousedown($event)',
        '(click)': 'toggleMenu()'
    }
})
export class FlMenuTriggerDirective implements AfterViewInit, OnDestroy {
    private _portal: any;
    private _openedByMouse: false;

    @Input('flMenuTrigger') menu: FlMenuPanel;

    @Output() onMenuOpen = new EventEmitter<void>();
    @Output() onMenuClose = new EventEmitter<void>();

    constructor(
        private _element: ElementRef,
        private _viewRef: ViewContainerRef
    ) {}

    ngAfterViewInit() {
        this._checkMenu();
    }

    ngOnDestroy() {
        this._destroyMenu();
    }

    private _destroyMenu(): void {
        // if (this._overlayRef) {}
    }

    private _checkMenu() {
        if (!this.menu) {
            throw new Error(`The menu is missing`);
        }
    }
}
