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
import { coerceToNumber } from './grid-list-measure';

@Component({
  selector: 'fl-grid-tile',
  host: {
    'role': 'listitem',
    '[class.fl-grid-tile]': 'true',
  },
  templateUrl: 'grid-tile.html',
  // template: '<ng-content></ng-content>',
  styleUrls: ['grid-list.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlGridTile {
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
