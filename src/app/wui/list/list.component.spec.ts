import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiListComponent } from './list';

describe('ListComponent', () => {
  let component: WuiListComponent;
  let fixture: ComponentFixture<WuiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
