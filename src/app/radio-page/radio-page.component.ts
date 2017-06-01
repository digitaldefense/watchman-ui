import { Component } from '@angular/core';

@Component({
  templateUrl: './radio-page.component.html',
})
export class RadioPageComponent {
  gender: 'boy' | 'girl' = null;

  constructor() { }

}
