import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FlThemeService } from '../theme2/theme.service';

@Component({
  selector: 'fl-accordion-card',
  templateUrl: './accordion-card.component.html',
  host: {
    '[class.fl-accordion-card]': 'true',
    '[class.fl-shadow-4]': 'true'
  },
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionCardComponent implements OnInit {
  _showArrows: boolean;

  @Input() title: string;
  @Input('icon-left') icon: string;
  @Input() shadow: string;
  @Input() color: string;

  @Input() isOpen: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onToggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Host() @Inject(forwardRef(() => AccordionComponent)) public accordion: AccordionComponent,
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService
  ) { }

  ngOnInit() {
    const elem = this._element.nativeElement;
    const theme = this._themeSvc.theme;

    if (this.shadow != null) {
      this._renderer.setStyle(elem, 'box-shadow', `0 ${this.shadow}px`);
    } else {
      this._renderer.addClass(elem, 'fl-shadow-4');
    }

    if (this.color == null || this.color === '') {
      this._themeSvc.applyBgColor(this._element, this._renderer, theme['card']);
    } else {
      this._themeSvc.applyBgColor(this._element, this._renderer, this.color);
    }

    this._showArrows = this.accordion.showArrows;
  }

  toggleCard(): void {
    if (this.disabled) { return; }

    const _isOpen = this.isOpen;
    if (this.accordion.closeOthers) {
      this.accordion.closeAll();
    }

    this.isOpen = _isOpen;
    return this.isOpen ? this.openCard() : this.closeCard();
  }

  openCard(): void {
    if (this.isOpen) {
      this._setOpenState(false);
    }
  }

  closeCard(): void {
    this._setOpenState(true);
  }

  private _setOpenState(isOpen: boolean): void {
    this.isOpen = isOpen;
    console.log(this.isOpen);
    this.isOpen ? this.onOpen.emit() : this.onClose.emit();
  }
}


@Component({
  selector: 'fl-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements OnInit, AfterContentInit, OnDestroy {
  private _subscription: Subscription;

  @Input() closeOthers = true;
  @Input() showArrows = true;
  @Input() expandAll = false;

  @ContentChildren(AccordionCardComponent) _cards: QueryList<AccordionCardComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._subscription) { this._subscription.unsubscribe(); }
  }

  ngAfterContentInit() {
    if (this.expandAll) {
      this.closeOthers = false;

      this._subscription = this._cards.changes.subscribe(change => {
        // https://github.com/pleerock/ngx-accordion/blob/master/src/Accordion.ts
      });
    }
  }

  closeAll() {
    this._cards.toArray().forEach(card => {
      card.isOpen = false;
    });
  }

}
