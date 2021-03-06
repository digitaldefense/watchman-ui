import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlToolbarComponent } from './toolbar.component';

describe('FlToolbarComponent', () => {
  let component: FlToolbarComponent;
  let fixture: ComponentFixture<FlToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
