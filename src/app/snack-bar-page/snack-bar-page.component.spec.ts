import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarPageComponent } from './snack-bar-page.component';

describe('SnackBarPageComponent', () => {
  let component: SnackBarPageComponent;
  let fixture: ComponentFixture<SnackBarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
