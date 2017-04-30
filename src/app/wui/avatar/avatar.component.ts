import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { FlIconComponent } from '../icon';

@Component({
  selector: 'wui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  host: {
    '[class.wui-avatar]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class AvatarComponent {
  private _imagePath: string;
  private _icon: string;

  hasImage = false;
  hasIcon = false;
  hasLetter = false;

  @Input()
  get image() { return this._imagePath; }
  set image(value: string) {
    this._imagePath = value;
    this.hasImage = true;
  }

  @Input()
  get icon() { return this._icon; }
  set icon(value: string) {
    this._icon = value;
    this.hasIcon = true;
  }

  constructor() { }

}
