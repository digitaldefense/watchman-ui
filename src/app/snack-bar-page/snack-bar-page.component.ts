import { Component } from '@angular/core';

import { FlSnackbar } from '../wui/snackbar';

@Component({
  templateUrl: './snack-bar-page.component.html',
})
export class SnackBarPageComponent {

  constructor(public snackbar: FlSnackbar) { }

  openSnackBar() {
    this.snackbar.open('Event added to your calendar', 'Dismiss', {duration: 2000});
  }
}
