import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import {
  UniqueSelectionDispatcher,
  FocusOriginMonitor,
  FocusOrigin
} from '../core';

import { FlThemeService } from '../theme2/theme.service';
import { FlIconComponent } from '../icon/icon.component';

/**
 * Provider Expression that allows md-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const FL_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FlRadioGroup),
  multi: true
};

let _uniqueIdCounter = 0;

/** Change event object emitted by MdRadio and MdRadioGroup. */
export class FlRadioChange {
  /** The FlRadioButton that emits the change event. */
  source: FlRadioButton;
  /** The value of the FlRadioButton. */
  value: any;
}

@Directive({
  selector: 'fl-radio-group',
  providers: [FL_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'radiogroup',
    '[class.fl-radio-group]': 'true'
  },
  inputs: ['disabled']
})
export class FlRadioGroup implements AfterContentInit, ControlValueAccessor {
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

  /** Whether the radio group is disabled. */
  private _disabled: boolean = false;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    // this._updateRadioButtonNames();
  }

  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value != newValue) {
      this._value = newValue; // set before proceeding to ensure no circular loops occur

      // this._updateSelectedRadioFromValue();
      // this._checkSelectedRadioButton();
    }
  }

  /** Whether the radio button is selected. */
  @Input()
  get selected() { return this._selected; }
  set selected(selected: FlRadioButton) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    // this._checkSelectedRadioButton();
  }

  /** Whether the radio group is disabled */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value) {
    this._disabled = value;
    // this._markRadiosForCheck();
  }

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

  constructor(private _changeDetector: ChangeDetectorRef) {}

  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on MdRadioGroup, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the MdRadioGroup.
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

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    if (value != null) {
      this.value = value;
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
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

  // _checkSelectedRadioButton() {
  //   if (this.selected && !this._selected.checked) {
  //     this._selected.checked = true;
  //   }
  // }

  /** Updates the `selected` radio button from the internal _value state. */
  // private _updateSelectedRadioFromValue(): void {
  //   // If the value already matches the selected radio, do nothing.
  //   let isAlreadySelected = this._selected != null && this._selected.value == this._value;

  //   if (this._radios != null && !isAlreadySelected) {
  //     this._selected = null;
  //     this._radios.forEach(radio => {
  //       radio.checked = this.value == radio.value;
  //       if (radio.checked) {
  //         this._selected = radio;
  //       }
  //     });
  //   }
  // }
}

@Component({
  selector: 'fl-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss'],
  host: {
    '[class.fl-radio-button]': 'true',
    '[class.inline]': 'true',
    '[class.fl-radio-disabled]': 'disabled',
    '(click)': '_onInputChange($event)',
    '[attr.id]': 'id',
  },
  encapsulation: ViewEncapsulation.None
})
export class FlRadioButton implements AfterViewInit, OnDestroy, OnInit {
  private _theme: any;

  /** The unique ID for the radio button. */
  @Input() id: string = `md-radio-${_uniqueIdCounter++}`;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name: string;

  /** Value assigned to this radio.*/
  private _value: any = null;

  /** Whether this radio is checked. */
  private _checked: boolean = false;

  /** Whether this radio is disabled. */
  private _disabled: boolean;

  /** The parent radio group. May or may not be present. */
  radioGroup: FlRadioGroup;

  @Input() label: string;

  /** Which side of the icon should the label appear on */
  @Input('align-label') labelPos: 'before' | 'after' = 'after';

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
          // this._icon.color = 'accent';
        }
      }
    }
  }

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(newCheckedState: boolean) {
    console.log('set checked', newCheckedState);
    
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
        this._icon.color = 'accent';
      } else {
        console.log('reset color');
        this._icon.resetColor();
      }
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() change: EventEmitter<FlRadioChange> = new EventEmitter<FlRadioChange>();

  @ViewChild(FlIconComponent) _icon: FlIconComponent;

  constructor(
    @Optional() radioGroup: FlRadioGroup,
    private _changeDetector: ChangeDetectorRef,
    private _radioDispatcher: UniqueSelectionDispatcher,
    private _focusOriginMonitor: FocusOriginMonitor,
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService
  ) {
    this.radioGroup = radioGroup;

    _radioDispatcher.listen((id: string, name: string) => {
      if (id != this.id && name == this.name) {
        this.checked = false;
      }
    });

    this._theme = _themeSvc.theme;
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
    // this._focusOriginMonitor
    //   .monitor(this._inputElement.nativeElement, this._renderer, false)
    //   .subscribe(focusOrigin => this._onInputFocusChange(focusOrigin));
  }

  ngOnDestroy() {
    // this._focusOriginMonitor.stopMonitoring(this._inputElement.nativeElement);
  }

  /** Focuses the radio button. */
  focus(): void {
    // this._focusOriginMonitor.focusVia(this._inputElement.nativeElement, this._renderer, 'keyboard');
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

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    let event = new FlRadioChange();
    event.source = this;
    event.value = this._value;
    this.change.emit(event);
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
    // this._icon.color = 'accent';
    this._emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup._controlValueAccessorChangeFn(this.value);
      this.radioGroup._touch();
      if (groupValueChanged) {
        this.radioGroup._emitChangeEvent();
      }
    }
  }
}
