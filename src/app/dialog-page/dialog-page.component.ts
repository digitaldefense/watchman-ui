import { Component, OnInit } from '@angular/core';
import { MdDialog } from '../wui/dialog';

@Component({
  templateUrl: './dialog-page.component.html',
})
export class DialogPageComponent {

  constructor(public dialog: MdDialog) { }

  openSimpleDialog() {
    this.dialog.open(SimpleDialogDemo);
  }

  openConfirmDialog() {
    this.dialog.open(SimpleDialogDemo);
  }
}

@Component({
  selector: 'simple-dialog-demo',
  template: `Basic alert dialog. Click out or press Esc to close.`
})
export class SimpleDialogDemo {}
