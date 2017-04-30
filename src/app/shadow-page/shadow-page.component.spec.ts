import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowPageComponent } from './shadow-page.component';

describe('ShadowPageComponent', () => {
  let component: ShadowPageComponent;
  let fixture: ComponentFixture<ShadowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
