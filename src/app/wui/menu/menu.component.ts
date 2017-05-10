import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { FlMenuPanel } from './menu-panel.interface';
import { FlMenuItemComponent } from './menu-item.component';

@Component({
  selector: 'fl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    'role': 'menu'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlMenuComponent implements OnDestroy {
  private _xPosition = 'after';
  private _yPosition = 'below';
  private _classList: any = {};

  @Input('class')
  set classList(classes: string) {
    this._classList = classes.split(' ').reduce((obj: any, className: string) => {
      obj[className] = true;
      return obj;
    }, {});
    this._setPositionClasses();
  }

  @Output() close = new EventEmitter<void>();

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  @ContentChildren(FlMenuItemComponent) items: QueryList<FlMenuItemComponent>;

  constructor() { }

  ngOnDestroy() {}

  emitCloseEvent(): void {
    this.close.emit();
  }

  private _setPositionClasses(posX = this._xPosition, posY = this._yPosition): void {
    this._classList['fl-menu-before'] = posX === 'before';
    this._classList['fl-menu-after'] = posX === 'after';
    this._classList['fl-menu-above'] = posY === 'above';
    this._classList['fl-menu-below'] = posY === 'below';
  }
}
