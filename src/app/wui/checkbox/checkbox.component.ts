import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { FocusOrigin, FocusOriginMonitor, MdRipple, RippleRef } from '../core';
import { mixinDisabled, CanDisable } from '../core/common-behaviors/disabled';
import { FlIconComponent } from '../icon/icon.component';

let _uniqueIdCounter = 0;

export const FL_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FlCheckboxComponent),
  multi: true
};

// export class FlCheckboxBase {
//   constructor(public _renderer: Renderer2, public _element: ElementRef) {}
// }

// export const _FlCheckboxMixinBase = mixinColor(mixinDi)

/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export enum TransitionCheckState {
  /** The initial state of the component before any user interaction. */
  Init,
  /** The state representing the component when it's becoming checked. */
  Checked,
  /** The state representing the component when it's becoming unchecked. */
  Unchecked,
  /** The state representing the component when it's becoming indeterminate. */
  Indeterminate
}

export class FlCheckboxChange {
  source: FlCheckboxComponent;
  checked: boolean;
}

@Component({
  selector: 'fl-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: {
    'class': 'fl-checkbox',
    '[class.fl-checked]': 'checked',
    '[class.fl-disabled]': 'disabled'
  },
  providers: [ FL_CHECKBOX_CONTROL_VALUE_ACCESSOR ],
  inputs: [ 'disabled', 'color' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlCheckboxComponent implements AfterViewInit, ControlValueAccessor, OnDestroy, OnInit, CanDisable {
  private _required: boolean;
  private _checked: boolean = false;
  private _indeterminate: boolean = false;
  private _disabled: boolean = false;

  /** Reference to the focused state ripple. */
  private _focusRipple: RippleRef;

  /** Whether the ripple effect on click should be disabled. */
  private _disableRipple: boolean;

  private _currentAnimationClass: string = '';
  private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;
  
  @Input('aria-label') ariaLabel: string = '';
  
  @Input() id: string = `fl-option-${_uniqueIdCounter++}`;

  @Input() tabIndex: number = 0;

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @Input('label') labelStr: string = '';

  labelOrder: number = 1;
  @Input('align-label') alignLabel: 'after' | 'before' = 'after';

  @Input() name: string = null;

  /** The value attribute of the native input element */
  @Input() value: string ;

  @Input()
  get checked() {
    return this._checked;
  }
  set checked(checked: boolean) {
    if (checked != this.checked) {
      this._checked = checked;
      if (checked) {
        // this._themeSvc.applyColor(this._element, this._renderer, 'accent');
        this._icon.color = 'accent';
      } else {
        // this._renderer.removeStyle(this._element.nativeElement, 'color');
        this._icon.resetColor();
      }
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Whether the ripple effect for this checkbox is disabled. */
  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }

  @Output() change: EventEmitter<FlCheckboxChange> = new EventEmitter<FlCheckboxChange>();

  /** Event emitted when the checkbox's `indeterminate` value changes. */
  @Output() indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** The native `<input type="checkbox"> element */
  @ViewChild('input') _inputElement: ElementRef;

  // @ViewChild('labelWrapper') _labelWrapper: ElementRef;

  @ViewChild(FlIconComponent) _icon: FlIconComponent;

  /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
  @ViewChild(MdRipple) _ripple: MdRipple;

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusOriginMonitor: FocusOriginMonitor,
    private _renderer: Renderer2,
    private _element: ElementRef,
  ) { }

  ngAfterViewInit() {
    this._focusOriginMonitor
      .monitor(this._inputElement.nativeElement, this._renderer, false)
      .subscribe(focusOrigin => this._onInputFocusChange(focusOrigin));
  }

  ngOnInit() {
    this.labelOrder = this.alignLabel === 'after' ? 1 : -1;
  }

  ngOnDestroy() {
    this._focusOriginMonitor.stopMonitoring(this._inputElement.nativeElement);
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value Value to be set to the model.
   */
  writeValue(value: any) {
    this.checked = !!value;
  }

  /**
   * Registers a callback to be triggered when the value has changed.
   * Implemented as part of ControlValueAccessor.
   * @param fn Function to be called on change.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Registers a callback to be triggered when the control has been touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be triggered when the checkbox is touched.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  onTouched: () => any = () => {};

  getInputId(): string {
    return `input-${this.id}`;
  }

  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  /** Toggles the `checked` state of the checkbox. */
  toggle(): void {
    this.checked = !this.checked;
  }

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   * Do not toggle on (change) event since IE doesn't fire change event when
   *   indeterminate checkbox is clicked.
   * @param event
   */
  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `checkbox` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();

    this._removeFocusRipple();

    if (!this.disabled) {
      // When user manually click on the checkbox, `indeterminate` is set to false.
      if (this._indeterminate) {
        Promise.resolve().then(() => {
          this._indeterminate = false;
          this.indeterminateChange.emit(this._indeterminate);
        });
      }

      this.toggle();
      this._transitionCheckState(
        this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);

      // Emit our custom change event if the native input emitted one.
      // It is important to only emit it, if the native input triggered one, because
      // we don't want to trigger a change event, when the `checked` variable changes for example.
      this._emitChangeEvent();
    }
  }

  /**
   * Sets the checkbox's disabled state. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the checkbox should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

  private _transitionCheckState(newState: TransitionCheckState) {
    let oldState = this._currentCheckState;
    let renderer = this._renderer;
    let elementRef = this._element;

    if (oldState === newState) {
      return;
    }
    if (this._currentAnimationClass.length > 0) {
      renderer.removeClass(elementRef.nativeElement, this._currentAnimationClass);
    }

    this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(
        oldState, newState);
    this._currentCheckState = newState;

    if (this._currentAnimationClass.length > 0) {
      renderer.addClass(elementRef.nativeElement, this._currentAnimationClass);
    }
  }

  private _emitChangeEvent() {
    let event = new FlCheckboxChange();
    event.source = this;
    event.checked = this.checked;

    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(event);
  }

  /** Function is called whenever the focus changes for the input element. */
  private _onInputFocusChange(focusOrigin: FocusOrigin) {
    if (!this._focusRipple && focusOrigin === 'keyboard') {
      this._focusRipple = this._ripple.launch(0, 0, {persistent: true, centered: true});
    } else if (!focusOrigin) {
      this._removeFocusRipple();
      this.onTouched();
    }
  }

  _onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  private _getAnimationClassForCheckStateTransition(
      oldState: TransitionCheckState, newState: TransitionCheckState): string {
    let animSuffix: string;

    switch (oldState) {
    case TransitionCheckState.Init:
      // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
      // [checked] bound to it.
      if (newState === TransitionCheckState.Checked) {
        animSuffix = 'unchecked-checked';
      } else if (newState == TransitionCheckState.Indeterminate) {
        animSuffix = 'unchecked-indeterminate';
      } else {
        return '';
      }
      break;
    case TransitionCheckState.Unchecked:
      animSuffix = newState === TransitionCheckState.Checked ?
          'unchecked-checked' : 'unchecked-indeterminate';
      break;
    case TransitionCheckState.Checked:
      animSuffix = newState === TransitionCheckState.Unchecked ?
          'checked-unchecked' : 'checked-indeterminate';
      break;
    case TransitionCheckState.Indeterminate:
      animSuffix = newState === TransitionCheckState.Checked ?
          'indeterminate-checked' : 'indeterminate-unchecked';
    }

    return `mat-checkbox-anim-${animSuffix}`;
  }

  /** Fades out the focus state ripple. */
  private _removeFocusRipple(): void {
    if (this._focusRipple) {
      this._focusRipple.fadeOut();
      this._focusRipple = null;
    }
  }
}
