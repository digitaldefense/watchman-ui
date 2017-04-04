import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiButton } from './button.component';

describe('WuiButton', () => {
  let component: WuiButton;
  let fixture: ComponentFixture<WuiButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiButton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
