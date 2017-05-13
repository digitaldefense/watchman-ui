import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattingPageComponent } from './formatting-page.component';

describe('FormattingPageComponent', () => {
  let component: FormattingPageComponent;
  let fixture: ComponentFixture<FormattingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormattingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormattingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
