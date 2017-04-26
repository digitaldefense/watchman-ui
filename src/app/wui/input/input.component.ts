import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Directive,
  HostBinding,
  Input,
  Optional,
  OnInit,
  Output,
  Renderer2,
  Self,
  ViewEncapsulation
} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';

import { coerceBooleanProperty } from '../core/index';
import { WuiThemeService } from '../theme/theme.service';

const MD_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit'
];

@Directive({
  selector: '[wuiInputBorder]'
})
export class WuiInputBorderDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: WuiThemeService
  ) {
    // _themeSvc.applyStyle(_element, _renderer, 'border-color', 'primary');
  }

  ngOnInit() {
    const elem = this._element.nativeElement;
    this._renderer.setStyle(elem, 'border-color', this._themeSvc.theme['primary']);
  }
}

@Directive({
  selector: `input[wuiInput]`,
  host: {
    '[class.wui-input]': 'true',
    '[id]': 'id',
    '[placeholder]': 'placeholder',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '(blur)': '_onBlur()',
    '(focus)': '_onFocus()',
    '(input)': '_onInput()'
  }
})
export class WuiInputDirective implements OnInit {
  private _id: string;
  private _type = 'text';
  private _placeholder = '';
  private _disabled = false;
  private _required = false;
  private _cachedUid: string;

  focused = false;

  @Input()
  get disabled() {
    return this._ngControl ? this._ngControl.disabled : this._disabled;
  }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  @Input()
  get id() { return this._id; }
  set id(value: string) { this._id = value; }

  @Input()
  get type() { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    this._validateType();
  }

  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) {
    if (this._placeholder !== value) {
      this._placeholder = value;
      this._placeholderChange.emit(this._placeholder);
    }
  }

  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = coerceBooleanProperty(value); }

  get value() { return this._element.nativeElement.value; }
  set value(value: string) { this._element.nativeElement.value = value; }

  @Output() _placeholderChange = new EventEmitter<string>();

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: WuiThemeService,
    @Optional() @Self() public _ngControl: NgControl
  ) {
    this.id = this.id;
  }

  ngOnInit() {
    this._themeSvc.applyForeground(this._element, this._renderer, 'foreground');
  }

  focus() { this._element.nativeElement.focus(); }

  protected _onFocus() { this.focused = true; }

  protected _onBlur() { this.focused = false; }

  protected _onInput() {
    // This is a noop function and is used to let Angular know whenever the value changes.
    // Angular will run a new change detection each time the `input` event has been dispatched.
    // It's necessary that Angular recognizes the value change, because when floatingLabel
    // is set to false and Angular forms aren't used, the placeholder won't recognize the
    // value changes and will not disappear.
    // Listening to the input event wouldn't be necessary when the input is using the
    // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
  }

  private _validateType() {
    if (MD_INPUT_INVALID_TYPES.indexOf(this._type) !== -1) {
      console.error('Unsupported type error');
    }
  }
}

@Component({
  selector: 'wui-input-group',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    '[attr.align]': 'null',
    '[class.wui-input-group]': 'true',
    '[class.wui-focused]' : '_wuiInputChild.focused',
    '(click)': '_focusInput()'
  },
  encapsulation: ViewEncapsulation.None
})
export class WuiInputGroupComponent implements AfterContentInit, OnInit {
  /** Alignment of the input container's content */
  @Input() align: 'start' | 'end' = 'start';

  @Input() color: 'primary' | 'accent' | 'warning' = 'primary';

  @ContentChild(WuiInputDirective) _wuiInputChild: WuiInputDirective;

  constructor(
    private _element: ElementRef,
    private _changeDetector: ChangeDetectorRef,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective
  ) { }

  ngAfterContentInit() {
    if (!this._wuiInputChild) {
      throw new Error('Missing WuiInput');
    }
  }

  ngOnInit() {
  }

  /** Focuses the underlying input */
  protected _focusInput() { this._wuiInputChild.focus(); }
}
