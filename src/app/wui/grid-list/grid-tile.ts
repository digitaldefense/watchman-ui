import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
// import {MdLine, MdLineSetter} from '../core';
import {coerceToNumber} from './grid-list-measure';

@Component({
  selector: 'md-grid-tile, mat-grid-tile, fl-grid-tile',
  host: {
    'role': 'listitem',
    '[class.fl-grid-tile]': 'true',
  },
  templateUrl: 'grid-tile.html',
  // template: '<ng-content></ng-content>',
  styleUrls: ['grid-list.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MdGridTile {
  _rowspan: number = 1;
  _colspan: number = 1;

  constructor(private _renderer: Renderer2, private _element: ElementRef) {}

  /** Amount of rows that the grid tile takes up. */
  @Input()
  get rowspan() { return this._rowspan; }
  set rowspan(value) { this._rowspan = coerceToNumber(value); }

  /** Amount of columns that the grid tile takes up. */
  @Input()
  get colspan() { return this._colspan; }
  set colspan(value) { this._colspan = coerceToNumber(value); }

  /**
   * Sets the style of the grid-tile element.  Needs to be set manually to avoid
   * "Changed after checked" errors that would occur with HostBinding.
   */
  _setStyle(property: string, value: string): void {
    this._renderer.setStyle(this._element.nativeElement, property, value);
  }
}

@Component({
  selector: 'fl-grid-tile-overlay',
  template: '<ng-content></ng-content>',
  host: {
    '[class.fl-grid-tile-overlay]': 'true'
  }
})
export class FlGridTileOverlay implements OnInit {
  @Input() position: 'top' | 'bottom' = 'bottom';

  @HostBinding('class.header') top: boolean;
  @HostBinding('class.footer') bottom: boolean;

  ngOnInit() {
    if (this.position === 'top') {
      this.top = true;
    } else {
      this.bottom = true;
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'md-grid-tile-header, mat-grid-tile-header, md-grid-tile-footer, mat-grid-tile-footer',
  templateUrl: 'grid-tile-text.html'
})
export class MdGridTileText implements AfterContentInit {
  /**
   *  Helper that watches the number of lines in a text area and sets
   * a class on the host element that matches the line count.
   */
  // _lineSetter: MdLineSetter;
  // @ContentChildren(MdLine) _lines: QueryList<MdLine>;

  constructor(private _renderer: Renderer2, private _element: ElementRef) {}

  ngAfterContentInit() {
    // this._lineSetter = new MdLineSetter(this._lines, this._renderer, this._element);
  }
}

/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: '[md-grid-avatar], [mat-grid-avatar]',
  host: {
    '[class.mat-grid-avatar]': 'true'
  }
})
export class MdGridAvatarCssMatStyler {}

/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: 'md-grid-tile-header, mat-grid-tile-header',
  host: {
    '[class.mat-grid-tile-header]': 'true'
  }
})
export class MdGridTileHeaderCssMatStyler {}

/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: 'md-grid-tile-footer, mat-grid-tile-footer',
  host: {
    '[class.mat-grid-tile-footer]': 'true'
  }
})
export class MdGridTileFooterCssMatStyler {}
