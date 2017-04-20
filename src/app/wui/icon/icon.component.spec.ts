import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: WuiIconComponent;
  let fixture: ComponentFixture<WuiIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
