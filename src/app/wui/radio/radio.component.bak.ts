import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Renderer2,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewEncapsulation,
  forwardRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {
  RippleRef,
  UniqueSelectionDispatcher,
  MdRipple,
  FocusOriginMonitor,
  FocusOrigin,
} from '../core';
import {coerceBooleanProperty} from '../core/coercion/boolean-property';
import {mixinDisabled, CanDisable} from '../core/common-behaviors/disabled';


/**
 * Provider Expression that allows fl-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const FL_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FlRadioGroup),
  multi: true
};

let _uniqueIdCounter = 0;

/** Change event object emitted by FlRadio and FlRadioGroup. */
export class FlRadioChange {
  /** The FlRadioButton that emits the change event. */
  source: FlRadioButton;
  /** The value of the FlRadioButton. */
  value: any;
}


// Boilerplate for applying mixins to FlRadioGroup.
// export class FlRadioGroupBase { }
// export const _FlRadioGroupMixinBase = mixinDisabled(FlRadioGroupBase);

/**
 * A group of radio buttons. May contain one or more `<md-radio-button>` elements.
 */
@Directive({
  selector: 'fl-radio-group',
  providers: [FL_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'radiogroup',
    '[class.fl-radio-group]': 'true',
  },
  inputs: ['disabled'],
})
export class FlRadioGroup
    implements AfterContentInit, ControlValueAccessor, CanDisable {
  /**
   * Selected value for group. Should equal the value of the selected radio button if there *is*
   * a corresponding radio button with a matching value. If there is *not* such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  private _value: any = null;

  /** The HTML name attribute applied to radio buttons in this group. */
  private _name: string = `md-radio-group-${_uniqueIdCounter++}`;

  /** The currently selected radio button. Should match value. */
  private _selected: FlRadioButton = null;

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized: boolean = false;

  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  private _labelPosition: 'before' | 'after' = 'after';

  /** Whether the radio group is disabled. */
  private _disabled: boolean = false;

  /** The method to be called in order to update ngModel */
  _controlValueAccessorChangeFn: (value: any) => void = (value) => {};

  /**
   * onTouch function registered via registerOnTouch (ControlValueAccessor).
   * @docs-private
   */
  onTouched: () => any = () => {};

  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() change: EventEmitter<FlRadioChange> = new EventEmitter<FlRadioChange>();

  /** Child radio buttons. */
  @ContentChildren(forwardRef(() => FlRadioButton))
  _radios: QueryList<FlRadioButton> = null;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  /**
   * Alignment of the radio-buttons relative to their labels. Can be 'before' or 'after'.
   * @deprecated
   */
  @Input()
  get align(): 'start' | 'end' {
    // align refers to the checkbox relative to the label, while labelPosition refers to the
    // label relative to the checkbox. As such, they are inverted.
    return this.labelPosition == 'after' ? 'start' : 'end';
  }

  set align(v) {
    this.labelPosition = (v == 'start') ? 'after' : 'before';
  }


  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  @Input()
  get labelPosition() {
    return this._labelPosition;
  }

  set labelPosition(v) {
    this._labelPosition = (v == 'before') ? 'before' : 'after';
    this._markRadiosForCheck();
  }

  /** Value of the radio button. */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value != newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }

  _checkSelectedRadioButton() {
    if (this.selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  /** Whether the radio button is selected. */
  @Input()
  get selected() { return this._selected; }
  set selected(selected: FlRadioButton) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }

  /** Whether the radio group is diabled */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value) {
    this._disabled = value;
    this._markRadiosForCheck();
  }

  constructor(private _changeDetector: ChangeDetectorRef) {
    // super();
  }

  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on FlRadioGroup, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the FlRadioGroup.
    this._isInitialized = true;
  }

  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  /** Updates the `selected` radio button from the internal _value state. */
  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    let isAlreadySelected = this._selected != null && this._selected.value == this._value;

    if (this._radios != null && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach(radio => {
        radio.checked = this.value == radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(): void {
    if (this._isInitialized) {
      let event = new FlRadioChange();
      event.source = this._selected;
      event.value = this._value;
      this.change.emit(event);
    }
  }

  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach(radio => radio._markForCheck());
    }
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.value = value;
    this._changeDetector.markForCheck();
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }
}

/**
 * A radio-button. May be inside of
 */
@Component({
  moduleId: module.id,
  selector: 'fl-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.fl-radio-button]': 'true',
    '[class.inline]': 'true',
    '[class.fl-radio-checked]': 'checked',
    '[class.fl-radio-disabled]': 'disabled',
    '[attr.id]': 'id',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlRadioButton implements OnInit, AfterViewInit, OnDestroy {

  selected: 'fa-circle-o' | 'fa-dot-circle-o' = 'fa-circle-o';

  @Input() label: string;

  /** The unique ID for the radio button. */
  @Input() id: string = `md-radio-${_uniqueIdCounter++}`;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name: string;

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input('aria-label') ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** Whether the ripple effect for this radio button is disabled. */
  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(newCheckedState: boolean) {
    if (this._checked != newCheckedState) {
      this._checked = newCheckedState;

      if (newCheckedState && this.radioGroup && this.radioGroup.value != this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value == this.value) {
        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }

      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }

  /** The value of this radio button. */
  @Input()
  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (this._value != value) {
      this._value = value;
      if (this.radioGroup != null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value == value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }

  /**
   * Whether or not the radio-button should appear before or after the label.
   * @deprecated
   */
  @Input()
  get align(): 'start' | 'end' {
    // align refers to the checkbox relative to the label, while labelPosition refers to the
    // label relative to the checkbox. As such, they are inverted.
    return this.labelPosition == 'after' ? 'start' : 'end';
  }

  set align(v) {
    this.labelPosition = (v == 'start') ? 'after' : 'before';
  }

  private _labelPosition: 'before' | 'after';

  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
  }

  set labelPosition(value) {
    this._labelPosition = value;
  }

  /** Whether the radio button is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() change: EventEmitter<FlRadioChange> = new EventEmitter<FlRadioChange>();

  /** The parent radio group. May or may not be present. */
  radioGroup: FlRadioGroup;

  /** ID of the native input element inside `<md-radio-button>` */
  get inputId(): string {
    return `${this.id}-input`;
  }

  /** Whether this radio is checked. */
  private _checked: boolean = false;

  /** Whether this radio is disabled. */
  private _disabled: boolean;

  /** Value assigned to this radio.*/
  private _value: any = null;

  /** Whether the ripple effect on click should be disabled. */
  private _disableRipple: boolean;

  /** The child ripple instance. */
  @ViewChild(MdRipple) _ripple: MdRipple;

  /** Reference to the current focus ripple. */
  private _focusRipple: RippleRef;

  /** The native `<input type=radio>` element */
  @ViewChild('input') _inputElement: ElementRef;

  constructor(@Optional() radioGroup: FlRadioGroup,
              private _elementRef: ElementRef,
              private _renderer: Renderer2,
              private _changeDetector: ChangeDetectorRef,
              private _focusOriginMonitor: FocusOriginMonitor,
              private _radioDispatcher: UniqueSelectionDispatcher) {
    // Assertions. Ideally these should be stripped out by the compiler.
    // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.

    this.radioGroup = radioGroup;

    _radioDispatcher.listen((id: string, name: string) => {
      if (id != this.id && name == this.name) {
        this.checked = false;
      }
    });
  }

  /** Focuses the radio button. */
  focus(): void {
    this._focusOriginMonitor.focusVia(this._inputElement.nativeElement, this._renderer, 'keyboard');
  }

  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetector.markForCheck();
  }

  ngOnInit() {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this._value;
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
  }

  ngAfterViewInit() {
    this._focusOriginMonitor
      .monitor(this._inputElement.nativeElement, this._renderer, false)
      .subscribe(focusOrigin => this._onInputFocusChange(focusOrigin));
  }

  ngOnDestroy() {
    this._focusOriginMonitor.stopMonitoring(this._inputElement.nativeElement);
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    let event = new FlRadioChange();
    event.source = this;
    event.value = this._value;
    this.change.emit(event);
  }

  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }

  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `radio-button` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  /**
   * Triggered when the radio button received a click or the input recognized any change.
   * Clicking on a label element, will trigger a change event on the associated input.
   */
  _onInputChange(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    let groupValueChanged = this.radioGroup && this.value != this.radioGroup.value;
    this.checked = true;
    this._emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup._controlValueAccessorChangeFn(this.value);
      this.radioGroup._touch();
      if (groupValueChanged) {
        this.radioGroup._emitChangeEvent();
      }
    }
  }

  /** Function is called whenever the focus changes for the input element. */
  private _onInputFocusChange(focusOrigin: FocusOrigin) {
    if (!this._focusRipple && focusOrigin === 'keyboard') {
      this._focusRipple = this._ripple.launch(0, 0, {persistent: true, centered: true});
    } else if (!focusOrigin) {
      if (this.radioGroup) {
        this.radioGroup._touch();
      }

      if (this._focusRipple) {
        this._focusRipple.fadeOut();
        this._focusRipple = null;
      }
    }
  }
}