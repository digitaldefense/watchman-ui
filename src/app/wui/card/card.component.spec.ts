import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiCardComponent } from './card.component';

describe('WuiCardComponent', () => {
  let component: WuiCardComponent;
  let fixture: ComponentFixture<WuiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
