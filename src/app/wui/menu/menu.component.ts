import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { ESCAPE } from '../core/keyboard/keycodes';

import { MenuPositionX, MenuPositionY } from './menu-positions';
import { FlMenuPanel } from './menu-panel.interface';
import { FlMenuItemComponent } from './menu-item.component';
import { transformMenu, fadeInItems } from './menu-animations';

@Component({
  selector: 'fl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    'role': 'menu'
  },
  encapsulation: ViewEncapsulation.None,
  animations: [
    transformMenu,
    fadeInItems
  ],
  exportAs: 'flMenu'
})
export class FlMenuComponent implements AfterContentInit, OnDestroy {
  private _keyManager: FocusKeyManager;
  private _xPosition: MenuPositionX = 'after';
  private _yPosition: MenuPositionY = 'below';

  /** Subscription to the tab events on the menu panel */
  private _tab$: Subscription;

  private _classList: any = {};

  @Input()
  get xPosition() { return this._xPosition; }
  set xPosition(value: MenuPositionX) {
    if (value !== 'before' && value !== 'after') {
      throw new Error('Invalid X position');
    }
    this._xPosition = value;
    this.setPositionClasses();
  }

  @Input()
  get yPosition() { return this._yPosition; }
  set yPosition(value: MenuPositionY) {
    if (value !== 'above' && value !== 'below') {
      throw new Error('Invalid Y position');
    }
    this._yPosition = value;
    this.setPositionClasses();
  }

  /** Whether the menu should overlap its trigger. */
  @Input() overlapTrigger = true;

  @Input('class')
  set classList(classes: string) {
    this._classList = classes.split(' ').reduce((obj: any, className: string) => {
      obj[className] = true;
      return obj;
    }, {});
    this.setPositionClasses();
  }

  /** Event emitted when the menu is closed. */
  @Output() close = new EventEmitter<void>();

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  /** List of the items inside of a menu. */
  @ContentChildren(FlMenuItemComponent) items: QueryList<FlMenuItemComponent>;

  constructor() { }

  ngAfterContentInit() {
    this._keyManager = new FocusKeyManager(this.items).withWrap();
    this._tab$ = this._keyManager.tabOut.subscribe(() => this._emitCloseEvent());
  }

  ngOnDestroy() {
    if (this._tab$) {
      this._tab$.unsubscribe();
    }
  }

  /** Handle a keyboard event from the menu, delegating to the appropriate action. */
  _handleKeydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case ESCAPE:
        this._emitCloseEvent();
        return;
      default:
        this._keyManager.onKeydown(event);
    }
  }

  /**
   * Focus the first item in the menu. This method is used by the menu trigger
   * to focus the first item when the menu is opened by the ENTER key.
   */
  focusFirstItem() {
    this._keyManager.setFirstItemActive();
  }

  /**
   * This emits a close event to which the trigger is subscribed. When emitted, the
   * trigger will close the menu.
   */
  private _emitCloseEvent(): void {
    this.close.emit();
  }

  /**
   * It's necessary to set position-based classes to ensure the menu panel animation
   * folds out from the correct direction.
   */
  setPositionClasses(posX = this._xPosition, posY = this._yPosition): void {
    this._classList['fl-menu-before'] = posX === 'before';
    this._classList['fl-menu-after'] = posX === 'after';
    this._classList['fl-menu-above'] = posY === 'above';
    this._classList['fl-menu-below'] = posY === 'below';
  }
}
