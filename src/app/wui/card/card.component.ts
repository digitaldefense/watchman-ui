import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import { FlThemeService } from '../theme2/theme.service';
import { FlIconComponent } from '../icon/index';


@Directive({
  selector: '[flCardToolbar]',
  // template: `
  //   <h1 class="fl-card-title">
  //     <ng-content></ng-content>
  //   </h1>
  //   <span class="fl-fill"></span>
  //   <ng-content select="button, fl-icon"></ng-content>
  // `,
  // host: {
  //   '[class.fl-card-toolbar]': 'true',
  //   '(click)': 'clickFn()',
  // }
})
export class FlCardToolbarDirective {
  // private _color: string;

  // isExpandable: boolean;

  // @Input()
  // get color() { return this._color; }
  // set color(value: string) { this._color = value; }

  // @Output()
  // onClick: EventEmitter<any> = new EventEmitter<any>();

  // constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) { }

  // ngOnInit() {
  //   const theme = this._themeSvc.theme;
  //   if (this.color != null && this.color !== '') {
  //     this._themeSvc.applyBgColor(this._element, this._renderer, this.color);
  //   } else {
  //     this._themeSvc.applyBgColor(this._element, this._renderer, theme['toolbar']);
  //   }
  // }

  // clickFn() {
  //   console.log('clickFn');
  //   this.onClick.emit('emit clickFn');
  // }
}

@Component({
  // selector: '[flCardToolbar]',
  selector: 'fl-card-toolbar',
  template: `
    <h1 class="fl-card-title">{{title}}</h1>
    <span class="fl-fill"></span>
    <ng-content select="button, fl-icon"></ng-content>
  `,
  host: {
    '[class.fl-card-toolbar]': 'true',
  }
})
export class FlCardToolbarComponent implements OnInit {
  private _color: string;

  @Input() title: string;

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value; }

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) { }

  ngOnInit() {
    const theme = this._themeSvc.theme;
    if (this.color != null && this.color !== '') {
      this._themeSvc.applyBgColor(this._element, this._renderer, this.color);
    } else {
      this._themeSvc.applyBgColor(this._element, this._renderer, theme['toolbar']);
    }
  }
}

@Directive({
  selector: 'fl-card-title',
  host: {
    '[class.fl-card-title]': 'true'
  }
})
export class FlCardTitleDirective {}

@Directive({
  selector: 'fl-card-subtitle',
  host: {
    '[class.fl-card-subtitle]': 'true'
  }
})
export class FlCardSubtitleDirective {}

@Directive({
  selector: 'fl-card-action-row'
})
export class FlCardActionsDirective {}

@Directive({
  selector: 'fl-card-divider'
})
export class FlCardDividerDirective {}


@Directive({
  selector: `[flCardBodyTrigger]`,
  host: {
    '(click)': 'toggleCardBody()'
  }
})
export class FlCardBodyTrigger implements AfterViewInit {
  private _collapsed: boolean = true;

  @Input('flCardBodyTrigger') panel: any;

  @Output() onPanelOpen = new EventEmitter<void>();
  @Output() onPanelClose = new EventEmitter<void>();

  constructor(private _element: ElementRef, private _viewRef: ViewContainerRef) { }

  ngAfterViewInit() {
    console.log(this.panel);
    this.panel.close.subscribe(() => this.closePanel());
  }

  toggleCardBody(): void {
    return this._collapsed ? this.openPanel() : this.closePanel();
  }

  openPanel(): void {
    if (this._collapsed) {
      console.log('open the panel');
      this._setCollapsed(false);
    }
  }

  closePanel(): void {
    console.log('close the panel');
    this._setCollapsed(true);
  }

  private _setCollapsed(isCollapsed: boolean): void {
    console.log('toggle collapsed');
    
    this._collapsed = isCollapsed;
    this._collapsed ? this.onPanelClose.emit() : this.onPanelOpen.emit();
  }
}

/** Wrapper for supporting text */
@Component({
  selector: 'fl-card-body',
  template: '<ng-content></ng-content>',
  host: {
    '[class.fl-card-support-text]': 'true'
  }
})
export class FlCardBody implements OnInit {
  _collapsed = false;

  @Input() collapsed: string;

  @HostBinding('class.collapsed') isCollapsed: boolean;

  ngOnInit() {
    if (this.collapsed != null && this.collapsed.length) {
      this.isCollapsed = true;
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }
  // Need this here to allow supporting text to be selectable
  // @HostListener('click', ['$event'])
  // onClick(event: MouseEvent) { event.stopImmediatePropagation(); }
}

/** Wrapper for collapsed supporting text */
@Component({
  selector: 'fl-card-collapsed',
  template: '<ng-content></ng-content>',
  host: {
    '[class.fl-card-support-text]': 'true'
  }
})
export class FlCardCollapsed {
  // Need this here to allow supporting text to be selectable
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) { event.stopImmediatePropagation(); }
}


@Directive({
  selector: '[flCardToggle]',
  host: {
    '(click)': 'toggleCollapsed()'
  }
})
export class FlCardToggle {
  // @Input('fl-card-toggle') hasToggle: boolean = false;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  toggleCollapsed() {
    console.log('click');
    this.toggle.emit();
  }
}


@Component({
  selector: 'fl-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    '[class.fl-card]': 'true',
    '(toggle)': 'toggleCollapsed()'
  },
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit, AfterContentInit {
  private _title: string;

  _hasTitleElements: boolean = false;

  @Input() shadow: number;
  @Input() color: string;
  @Input() collapsed: boolean;

  @Input()
  get title() { return this._title; }
  set title(value: string) {
    this._title = value;
    this._hasTitleElements = true;
  }

  @ContentChildren(FlCardToolbarComponent) _toolbars: QueryList<FlCardToolbarComponent>;
  @ContentChild(FlCardTitleDirective) _titleD: FlCardTitleDirective;
  @ContentChild(FlCardSubtitleDirective) _subtitleD: FlCardSubtitleDirective;
  @ContentChildren(FlCardBody) _body: QueryList<FlCardBody>;

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) { }

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
  }

  ngAfterContentInit() {
    if (this.collapsed && !this._body.length) {
      throw new Error('The collapsed property needs an fl-card-body element');
    }

    if (this._titleD || this._subtitleD) {
      this._hasTitleElements = true;
    }
  }

  onToggleCollapsed() {
    console.log('onToggleCollapsed');
    //   return this.collapsed ? this.openPanel() : this.closePanel();
  }

  openPanel(): void {
    if (this.collapsed) {
      this._setCollapsed(false);
    }
  }

  closePanel(): void {
    this._setCollapsed(true);
  }

  private _setCollapsed(isCollapsed: boolean): void {
    this.collapsed = isCollapsed;
  }
}
