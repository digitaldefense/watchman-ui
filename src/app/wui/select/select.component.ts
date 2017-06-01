import {
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  Self,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ENTER, SPACE, UP_ARROW, DOWN_ARROW, HOME, END } from '../core/keyboard/keycodes';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';

import { FlThemeService } from '../theme2/theme.service';


export const FL_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FlSelectComponent),
  multi: true
};

// export class FlSelectChange {
//   source: Fl
// }


@Component({
  selector: 'fl-option',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class FlOptionComponent {}


@Component({
  selector: 'fl-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    'role': 'listbox',
    '[attr.tabindex]': 'tabIndex',
    // '[aria-label]': '_ariaLabel',
    // '[attr.aria-labelledby]': 'ariaLabelledby',
    '[class.fl-select-container]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlSelectComponent implements OnInit {
  private _theme: any;

  /** The placeholder displayed in the trigger of the select. */
  private _placeholder: string;

  /** Aria label of the select. If not specified, the placeholder will be used as label. */
  @Input('aria-label') ariaLabel: string = '';

  /** Input that can be used to specify the `aria-labelledby` attribute. */
  @Input('aria-labelledby') ariaLabelledby: string = '';

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;

    // Must wait to record the trigger width to ensure placeholder width is included.
    // Promise.resolve(null).then(() => this._setTriggerWidth());
  }

  /** All of the defined select options. */
  @ContentChildren(FlOptionComponent) options: QueryList<FlOptionComponent>;

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService,
  ) {
    this._theme = _themeSvc.theme;
  }

  ngOnInit() {
  }

  get _ariaLabel(): string {
    return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
  }
}
