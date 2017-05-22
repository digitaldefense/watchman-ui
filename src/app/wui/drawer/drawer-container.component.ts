import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import 'rxjs/add/operator/first';

import {Dir, coerceBooleanProperty} from '../core';

import { DrawerComponent } from './drawer.component';

/** Throws an exception when two DrawerComponent are matching the same side. */
export function throwFlDuplicatedDrawerError(align: string) {
  throw new Error(`A sidenav was already declared for 'align="${align}"'`);
}

@Component({
  selector: 'fl-drawer-container',
  templateUrl: 'drawer-container.component.html',
  styleUrls: ['drawer.component.scss'],
  host: {
    '[class.fl-drawer-container]': 'true',
    '[class.fl-drawer-transition]': '_enableTransitions'
  },
  encapsulation: ViewEncapsulation.None
})
export class DrawerContainerComponent implements AfterContentInit {
  @ContentChildren(DrawerComponent) _drawers: QueryList<DrawerComponent>;

  private _start: DrawerComponent;
  private _end: DrawerComponent;
  private _left: DrawerComponent;
  private _right: DrawerComponent;

  get start() { return this._start; }
  get end() { return this._end; }

  private _enableTransitions: boolean;

  private _isDrawerOpen(side: DrawerComponent): boolean {
    return side != null && side.opened;
  }

  @Output() backdropClick = new EventEmitter<void>();

  constructor(@Optional() private _dir: Dir, private _elem: ElementRef, private _renderer: Renderer2, private _ngZone: NgZone) {
      if (_dir != null) {
          _dir.dirChange.subscribe(() => this._validateDrawers());
      }
  }

  ngAfterContentInit() {
    this._drawers.changes.subscribe(() => this._validateDrawers());
    this._drawers.forEach((drawer: DrawerComponent) => {
        this._watchDrawerToggle(drawer);
        this._watchDrawerAlign(drawer);
    });
    this._validateDrawers();

    this._ngZone.onMicrotaskEmpty.first().subscribe(() => this._enableTransitions = true);
  }

  open() {
      return Promise.all([this._start, this._end].map(drawer => drawer && drawer.open()));
  }

  close() {
      return Promise.all([this._start, this._end].map(drawer => drawer && drawer.close()));
  }

  /**
   * Subscribes to sidenav events in order to set a class on the main container element when the
   * sidenav is open and the backdrop is visible. This ensures any overflow on the container element
   * is properly hidden.
   */
  private _watchDrawerToggle(drawer: DrawerComponent): void {
      if (!drawer || drawer.mode === 'side') { return; }
      drawer.onOpen.subscribe(() => this._setContainerClass(true));
      drawer.onClose.subscribe(() => this._setContainerClass(false));
  }

  /**
   * Subscribes to sidenav onAlignChanged event in order to re-validate drawers when the align
   * changes.
   */
  private _watchDrawerAlign(drawer: DrawerComponent): void {
    if (!drawer) {
      return;
    }
    // NOTE: We need to wait for the microtask queue to be empty before validating,
    // since both drawers may be swapping sides at the same time.
    drawer.onAlignChanged.subscribe(() =>
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this._validateDrawers()));
  }

  /** Toggles the 'fl-drawer-opened' class on the main 'fl-drawer-container' element. */
  private _setContainerClass(isAdd: boolean): void {
    if (isAdd) {
      this._renderer.addClass(this._elem.nativeElement, 'fl-drawer-opened');
    } else {
      this._renderer.removeClass(this._elem.nativeElement, 'fl-drawer-opened');
    }
  }

  /** Validate the state of the sidenav children components. */
  private _validateDrawers() {
    this._start = this._end = null;

    // Ensure that we have at most one start and one end sidenav.
    // NOTE: We must call toArray on _sidenavs even though it's iterable
    // (see https://github.com/Microsoft/TypeScript/issues/3164).
    for (let drawer of this._drawers.toArray()) {
      if (drawer.align === 'end') {
        if (this._end != null) {
          throwFlDuplicatedDrawerError('end');
        }
        this._end = drawer;
      } else {
        if (this._start != null) {
          throwFlDuplicatedDrawerError('start');
        }
        this._start = drawer;
      }
    }

    this._right = this._left = null;

    // Detect if we're LTR or RTL.
    if (this._dir == null || this._dir.value === 'ltr') {
      this._left = this._start;
      this._right = this._end;
    } else {
      this._left = this._end;
      this._right = this._start;
    }
  }

  _onBackdropClicked() {
    this.backdropClick.emit();
    this._closeDrawer();
  }

  _closeDrawer() {
    // Close all open sidenav's where closing is not disabled and the mode is not `side`.
    [this._start, this._end]
      .filter(drawer => drawer && !drawer.disableClose && drawer.mode !== 'side')
      .forEach(drawer => drawer.close());
  }

  _isShowingBackdrop(): boolean {
    return (this._isDrawerOpen(this._start) && this._start.mode !== 'side')
        || (this._isDrawerOpen(this._end) && this._end.mode !== 'side');
  }

  private _isSidenavOpen(side: DrawerComponent): boolean {
    return side != null && side.opened;
  }

  /**
   * Return the width of the sidenav, if it's in the proper mode and opened.
   * This may relayout the view, so do not call this often.
   * @param drawer
   * @param mode
   */
  private _getDrawerEffectiveWidth(drawer: DrawerComponent, mode: string): number {
    return (this._isDrawerOpen(drawer) && drawer.mode === mode) ? drawer._width : 0;
  }

  _getMarginLeft() {
    return this._getDrawerEffectiveWidth(this._left, 'side');
  }

  _getMarginRight() {
    return this._getDrawerEffectiveWidth(this._right, 'side');
  }

  _getPositionLeft() {
    return this._getDrawerEffectiveWidth(this._left, 'push');
  }

  _getPositionRight() {
    return this._getDrawerEffectiveWidth(this._right, 'push');
  }

  /**
   * Returns the horizontal offset for the content area.  There should never be a value for both
   * left and right, so by subtracting the right value from the left value, we should always get
   * the appropriate offset.
   */
  _getPositionOffset() {
    return this._getPositionLeft() - this._getPositionRight();
  }

  /**
   * This is using [ngStyle] rather than separate [style...] properties because [style.transform]
   * doesn't seem to work right now.
   */
  _getStyles() {
    return {
      marginLeft: `${this._getMarginLeft()}px`,
      marginRight: `${this._getMarginRight()}px`,
      transform: `translate3d(${this._getPositionOffset()}px, 0, 0)`
    };
  }
}
