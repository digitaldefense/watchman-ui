import { Component, ViewEncapsulation } from '@angular/core';

import { FlSnackbarRef } from './snackbar-ref';

/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
@Component({
  moduleId: module.id,
  selector: 'simple-snackbar',
  templateUrl: 'simple-snackbar.component.html',
  styleUrls: ['simple-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.fl-simple-snackbar]': 'true',
  }
})
export class SimpleSnackbar {
  /** The message to be shown in the snack bar. */
  message: string;

  /** The label for the button in the snack bar. */
  action: string;

  /** The instance of the component making up the content of the snack bar. */
  snackBarRef: FlSnackbarRef<SimpleSnackbar>;

  /** Dismisses the snack bar. */
  dismiss(): void {
    this.snackBarRef._action();
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.action;
  }
}