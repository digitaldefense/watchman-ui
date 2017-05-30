import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
  isFakeMousedownFromScreenReader,
  Dir,
  LayoutDirection,
  Overlay,
  OverlayState,
  OverlayRef,
  TemplatePortal,
  ConnectedPositionStrategy,
  HorizontalConnectionPos,
  VerticalConnectionPos,
  RepositionScrollStrategy,
  ScrollDispatcher
} from '../core';

import { MenuPositionX, MenuPositionY } from './menu-positions';
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
  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef;
  private _menuOpen = false;
  private _backdrop$: Subscription;
  private _position$: Subscription;

  private _openedByMouse: boolean = false;

  @Input('flMenuTrigger') menu: FlMenuPanel;

  @Output() onMenuOpen = new EventEmitter<void>();
  @Output() onMenuClose = new EventEmitter<void>();

  constructor(
    private _overlay: Overlay,
    private _element: ElementRef,
    private _viewRef: ViewContainerRef,
    @Optional() private _dir: Dir,
    private _scrollDispatcher: ScrollDispatcher
  ) { }

  ngAfterViewInit() {
    this._checkMenu();
    this.menu.close.subscribe(() => this.closeMenu());
  }

  ngOnDestroy() {
    this.destroyMenu();
  }

  get menuOpen(): boolean { return this._menuOpen; }

  toggleMenu(): void {
    return this._menuOpen ? this.closeMenu() : this.openMenu();
  }

  /** Opens the menu. */
  openMenu(): void {
    if (!this._menuOpen) {
      this._createOverlay();
      this._overlayRef.attach(this._portal);
      this._subscribeToBackdrop();
      this._initMenu();
    }
  }

  closeMenu(): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._backdrop$.unsubscribe();
      this._resetMenu();
    }
  }

  destroyMenu(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      this._cleanUpSubscriptions();
    }
  }

  focus() {
    this._element.nativeElement.focus();
  }

  get dir(): LayoutDirection {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  private _subscribeToBackdrop(): void {
    this._backdrop$ = this._overlayRef.backdropClick().subscribe(() => {
      this.menu._emitCloseEvent();
    });
  }

  private _initMenu(): void {
    this._setIsMenuOpen(true);

    // Should only set focus if opened via the keyboard, so keyboard users can
    // can easily navigate menu items. According to spec, mouse users should not
    // see the focus style.
    if (!this._openedByMouse) {
      this.menu.focusFirstItem()
    }
  }

  /**
   * This method resets the menu when it's closed, most importantly restoring
   * * focus to the menu trigger if the menu was opened via the keyboard.
   */
  private _resetMenu(): void {
    this._setIsMenuOpen(false);

    if (!this._openedByMouse) { this.focus(); }
    this._openedByMouse = false;
  }

  private _setIsMenuOpen(isOpen: boolean): void {
    this._menuOpen = isOpen;
    this._menuOpen ? this.onMenuOpen.emit() : this.onMenuClose.emit();
  }

  private _checkMenu() {
    if (!this.menu) {
      throw new Error(`The menu is missing`);
    }
  }

  private _createOverlay(): void {
    if (!this._overlayRef) {
      this._portal = new TemplatePortal(this.menu.templateRef, this._viewRef);
      const config = this._getOverlayConfig();
      this._subscribeToPositions(config.positionStrategy as ConnectedPositionStrategy);
      this._overlayRef = this._overlay.create(config);
    }
  }

  /**
   * This method builds the configuration object needed to create the overlay, the OverlayState.
   * @returns OverlayState
   */
  private _getOverlayConfig(): OverlayState {
    const overlayState = new OverlayState();
    overlayState.positionStrategy = this._getPosition()
      .withDirection(this.dir);
    overlayState.hasBackdrop = true;
    overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
    overlayState.direction = this.dir;
    overlayState.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
    return overlayState;
  }

  /**
   * Listens to changes in the position of the overlay and sets the correct classes
   * on the menu based on the new position. This ensures the animation origin is always
   * correct, even if a fallback position is used for the overlay.
   */
  private _subscribeToPositions(position: ConnectedPositionStrategy): void {
    this._position$ = position.onPositionChange.subscribe((change) => {
      const posX: MenuPositionX = change.connectionPair.originX === 'start' ? 'after' : 'before';
      let posY: MenuPositionY = change.connectionPair.originY === 'top' ? 'below' : 'above';

      if (!this.menu.overlapTrigger) {
        posY = posY === 'below' ? 'above' : 'below';
      }

      this.menu.setPositionClasses(posX, posY);
    });
  }

  /**
   * This method builds the position strategy for the overlay, so the menu is properly connected
   * to the trigger.
   * @returns ConnectedPositionStrategy
   */
  private _getPosition(): ConnectedPositionStrategy {
    const [posX, fallbackX]: HorizontalConnectionPos[] =
      this.menu.xPosition === 'before' ? ['end', 'start'] : ['start', 'end'];

    const [overlayY, fallbackOverlayY]: VerticalConnectionPos[] =
      this.menu.yPosition === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

    let originY = overlayY;
    let fallbackOriginY = fallbackOverlayY;

    if (!this.menu.overlapTrigger) {
      originY = overlayY === 'top' ? 'bottom' : 'top';
      fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
    }

    return this._overlay.position()
      .connectedTo(this._element,
      { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
      .withFallbackPosition(
      { originX: fallbackX, originY: originY },
      { overlayX: fallbackX, overlayY: overlayY })
      .withFallbackPosition(
      { originX: posX, originY: fallbackOriginY },
      { overlayX: posX, overlayY: fallbackOverlayY })
      .withFallbackPosition(
      { originX: fallbackX, originY: fallbackOriginY },
      { overlayX: fallbackX, overlayY: fallbackOverlayY });
  }

  private _cleanUpSubscriptions(): void {
    if (this._backdrop$) {
      this._backdrop$.unsubscribe();
    }
    if (this._position$) {
      this._position$.unsubscribe();
    }
  }

  _handleMousedown(event: MouseEvent) {
    if (!isFakeMousedownFromScreenReader(event)) {
      this._openedByMouse = true;
    }
  }
}
