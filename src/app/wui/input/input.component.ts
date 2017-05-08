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
import { FlThemeService } from '../theme2/theme.service';

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

// let nextUniqueId = 0;

// @Directive({
//   selector: 'fl-placeholder'
// })
// export class WuiPlaceholderDirective {}

@Directive({
  selector: '[flInputBorder]'
})
export class FlInputBorderDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService
  ) {
    // _themeSvc.applyStyle(_element, _renderer, 'border-color', 'primary');
  }

  ngOnInit() {
    const elem = this._element.nativeElement;
    this._renderer.setStyle(elem, 'border-color', this._themeSvc.theme['primary']);
  }
}

@Directive({
  selector: 'label[flLabel]',
  host: {
    '[class.fl-input-label]': 'true'
  }
})
export class FlInputLabelDirective {
  // private _color: string;

  // @Input()
  // get color() { return this._color; }
  // set color(value: string) { this._color = value; }

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService
  ) {
    this._themeSvc.applyColor(this._element, this._renderer, 'primary');
  }

  focus() {
    this._themeSvc.applyColor(this._element, this._renderer, 'primary');
  }
}

@Directive({
  selector: `input[flInput]`,
  host: {
    '[class.fl-input]': 'true',
    '[id]': 'id',
    // '[placeholder]': 'placeholder',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '(blur)': '_onBlur()',
    '(focus)': '_onFocus()',
    '(input)': '_onInput()'
  }
})
export class FlInputDirective implements OnInit {
  private _id: string;
  private _type = 'text';
  private _placeholder = '';
  private _label: string = null;
  private _hint: string = null;
  private _disabled = false;
  private _required = false;
  private _cachedUid: string;

  focused = false;
  ariaDescribedBy: string;

  /** Standard "disabled" attribute */
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
  // get placeholder() { return this._placeholder; }
  set placeholder(value: string) {
    // if (this._placeholder !== value) {
    //   this._placeholder = value;
    //   this._placeholderChange.emit(this._placeholder);
    // }
    throw new Error('The standard "placeholder" attribute is not supported on INPUT. Use "hint" instead.');
  }

  /** Floating label */
  @Input()
  get label() { return this._label; }
  set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._labelChange.emit(this._label);
    }
  }

  /** Used instead of "placeholder" to display prompt text */
  @Input()
  get hint() { return this._hint; }
  set hint(value: string) { this._hint = value; }

  /** Standard "required" attribute */
  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = coerceBooleanProperty(value); }

  get value() { return this._element.nativeElement.value; }
  set value(value: string) { this._element.nativeElement.value = value; }

  // @Output() _placeholderChange = new EventEmitter<string>();
  @Output() _labelChange = new EventEmitter<string>();

  get empty(): boolean {
    return Boolean(this.value == null || this.value === '');
  }

  // private _neverEmptyInputTypes = [
  //   'date',
  //   'datetime',
  //   'datetime-local',
  //   'month',
  //   'time',
  //   'week'
  // ].filter(t => getSupportedInputTypes().has(t));

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService,
    @Optional() @Self() public _ngControl: NgControl
  ) {
    this.id = this.id;
  }

  ngOnInit() {
    this._themeSvc.applyColor(this._element, this._renderer, 'text');
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
  selector: 'fl-input-group',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    '[attr.align]': 'null',
    '[class.fl-input-group]': 'true',
    '[class.fl-focused]': '_flInputChild.focused',
    '[class.disabled]': '_flInputChild.disabled',
    '[class.ng-untouched]': '_shouldForward("untouched")',
    '[class.ng-touched]': '_shouldForward("touched")',
    '[class.ng-pristine]': '_shouldForward("pristine")',
    '[class.ng-dirty]': '_shouldForward("dirty")',
    '[class.ng-valid]': '_shouldForward("valid")',
    '[class.ng-invalid]': '_shouldForward("invalid")',
    '[class.ng-pending]': '_shouldForward("pending")',
    '(click)': '_focusInput()'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlInputGroupComponent implements AfterContentInit, OnInit {
  /** Alignment of the input container's content */
  @Input() align: 'start' | 'end' = 'start';

  @Input() color: 'primary' | 'accent' | 'warning' = 'primary';

  @ContentChild(FlInputDirective) _flInputChild: FlInputDirective;
  @ContentChild(FlInputLabelDirective) _labelChild: FlInputLabelDirective;

  constructor(
    private _element: ElementRef,
    private _changeDetector: ChangeDetectorRef,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective
  ) { }

  ngAfterContentInit() {
    if (!this._flInputChild) {
      throw new Error('Missing flInput');
    }

    // this._validatePlaceholders();

    // this._flInputChild._placeholderChange.subscribe(() => this._validatePlaceholders());
  }

  ngOnInit() {
  }

  _shouldForward(prop: string): boolean {
    let control = this._flInputChild ? this._flInputChild._ngControl : null;
    return control && (control as any)[prop];
  }

  /** Is there a placeholder/hint */
  hasPlaceholder() {
    return !!(this._flInputChild.hint);
  }

  /** Is there a label */
  hasLabel() {
    return !!(this._flInputChild.label);
  }

  /** Focuses the underlying input */
  protected _focusInput() {
    this._flInputChild.focus();
    // this isn't working properly. _labelChild is undefined. Using CSS to compensate
    if (this._labelChild) {
      this._labelChild.focus();
    }
  }

  // private _validatePlaceholders() {
  //   if (this._flInputChild.placeholder && this._placeholderChild) {
  //     throw new Error('There can be only one placeholder attribute.');
  //   }
  // }
}
