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

}

@Component({
  selector: 'simple-dialog-demo',
  template: `<p>Basic alert.</p>`
})
export class SimpleDialogDemo {}
