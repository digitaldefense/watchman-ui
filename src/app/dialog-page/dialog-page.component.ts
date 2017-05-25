import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '../wui/dialog';

@Component({
  templateUrl: './dialog-page.component.html',
})
export class DialogPageComponent {
  confirmDialogResults: string;

  constructor(public dialog: MdDialog) { }

  openSimpleDialog() {
    this.dialog.open(SimpleDialogDemo);
  }

  openConfirmDialog() {
    let dialogRef = this.dialog.open(ConfirmDialogDemo, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.confirmDialogResults = `You clicked Ok`;
      } else {
        this.confirmDialogResults = `You clicked Cancel`;
      }
    })
  }
}

@Component({
  selector: 'simple-dialog-demo',
  template: `Basic alert dialog. Click out or press Esc to close.`
})
export class SimpleDialogDemo {}

@Component({
  selector: 'confirm-dialog-demo',
  template: `
    <div md-dialog-title>Confirm</div>
    <div md-dialog-content>Please confirm your action.</div>
    <div md-dialog-actions>
      <button class="fl-button" md-dialog-close>Cancel</button>
      <button class="fl-button" (click)="dialogRef.close('ok')">Ok</button>
    </div>
  `
})
export class ConfirmDialogDemo {
  constructor(public dialogRef: MdDialogRef<ConfirmDialogDemo>) {}
}
