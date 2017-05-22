import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { coerceBooleanProperty } from '../core';
import { FlThemeService } from '../theme2/theme.service';

/** Sidenav toggle promise result. */
export class FlDrawerToggleResult {
  constructor(public type: 'open' | 'close', public animationFinished: boolean) {}
}

@Component({
  selector: 'fl-drawer',
  template: '<ng-content></ng-content>',
  styleUrls: ['./drawer.component.scss'],
  host: {
    '[class.fl-drawer]': 'true',
    '(transitionend)': '_onTransitionEnd($event)',
    '[attr.align]': 'null',
    '[class.fl-drawer-closed]': '_isClosed',
    '[class.fl-drawer-closing]': '_isClosing',
    '[class.fl-drawer-end]': '_isEnd',
    '[class.fl-drawer-opened]': '_isOpened',
    '[class.fl-drawer-opening]': '_isOpening',
    '[class.fl-drawer-over]': '_modeOver',
    '[class.fl-drawer-push]': '_modePush',
    '[class.fl-drawer-side]': '_modeSide',
    'tabIndex': '-1'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DrawerComponent implements AfterContentInit, OnDestroy {
  private _align: 'start' | 'end' = 'start';
  private _opened = false;

  private _focusOrigin: HTMLElement = null;
  private _toggleAnimationPromise: Promise<FlDrawerToggleResult> = null;
  private _resolveToggleAnimationPromise: (animationFinished: boolean) => void = null;

  @Input()
  get align() { return this._align; }
  set align(value) {
    value = (value === 'end') ? 'end' : 'start';
    if (value !== this._align) {
      this._align = value;
      this.onAlignChanged.emit();
    }
  }

  @Input() mode: 'over' | 'push' | 'side' = 'over';

  @Input()
  get opened(): boolean { return this._opened; }
  set opened(v: boolean) {
    this.toggle(coerceBooleanProperty(v));
  }

  /** Whether the sidenav can be closed with the escape key or not. */
  @Input()
  get disableClose(): boolean { return this._disableClose; }
  set disableClose(value: boolean) { this._disableClose = coerceBooleanProperty(value); }
  private _disableClose: boolean = false;

  @Output('open-start') onOpenStart = new EventEmitter<void>();
  @Output('open') onOpen = new EventEmitter<void>();
  @Output('close-start') onCloseStart = new EventEmitter<void>();
  @Output('close') onClose = new EventEmitter<void>();

  @Output('align-changed') onAlignChanged = new EventEmitter<void>();

  constructor(private _elem: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) {
    const theme = _themeSvc.theme;
    _themeSvc.applyBgColor(_elem, _renderer, 'card');

    this.onOpen.subscribe(() => {
      this._focusOrigin = document.activeElement as HTMLElement;
    });

    this.onClose.subscribe(() => {
      if (this._focusOrigin instanceof HTMLElement) {
        this._focusOrigin.focus();
      } else {
        this._elem.nativeElement.blur();
      }

      this._focusOrigin = null;
    });
  }

  ngAfterContentInit() {
    if (this._toggleAnimationPromise) {
      this._resolveToggleAnimationPromise(true);
      this._toggleAnimationPromise = this._resolveToggleAnimationPromise = null;
    }
  }

  ngOnDestroy() {
  }

  open(): Promise<FlDrawerToggleResult> {
    return this.toggle(true);
  }

  close(): Promise<FlDrawerToggleResult> {
    return this.toggle(false);
  }

  toggle(isOpen: boolean = !this.opened): Promise<FlDrawerToggleResult> {
    if (isOpen === this.opened) {
      return this._toggleAnimationPromise || 
        Promise.resolve(new FlDrawerToggleResult(isOpen ? 'open' : 'close', true));
    }

    this._opened = isOpen;

    if (isOpen) {
      this.onOpenStart.emit();
    } else {
      this.onCloseStart.emit();
    }

    if (this._toggleAnimationPromise) {
      this._resolveToggleAnimationPromise(false);
    }
    this._toggleAnimationPromise = new Promise<FlDrawerToggleResult>(resolve => {
      this._resolveToggleAnimationPromise = animationFinished => 
        resolve(new FlDrawerToggleResult(isOpen ? 'open' : 'close', animationFinished));
    });

    return this._toggleAnimationPromise;
  }

  /**
   * When transition has finished, set the internal state for classes and emit the proper event.
   * The event passed is actually of type TransitionEvent, but that type is not available in
   * Android so we use any.
   */
  _onTransitionEnd(transitionEvent: TransitionEvent) {
    if (transitionEvent.target === this._elem.nativeElement
        // Simpler version to check for prefixes.
        && transitionEvent.propertyName.endsWith('transform')) {
      if (this._opened) {
        this.onOpen.emit();
      } else {
        this.onClose.emit();
      }

      if (this._toggleAnimationPromise) {
        this._resolveToggleAnimationPromise(true);
        this._toggleAnimationPromise = this._resolveToggleAnimationPromise = null;
      }
    }
  }

  get _isClosing() {
    return !this._opened && !!this._toggleAnimationPromise;
  }
  get _isOpening() {
    return this._opened && !!this._toggleAnimationPromise;
  }
  get _isClosed() {
    return !this._opened && !this._toggleAnimationPromise;
  }
  get _isOpened() {
    return this._opened && !this._toggleAnimationPromise;
  }
  get _isEnd() {
    return this.align === 'end';
  }
  get _modeSide() {
    return this.mode === 'side';
  }
  get _modeOver() {
    return this.mode === 'over';
  }
  get _modePush() {
    return this.mode === 'push';
  }

  get _width() {
    if (this._elem.nativeElement) {
      return this._elem.nativeElement.offsetWidth;
    }
    return 0;
  }
}
