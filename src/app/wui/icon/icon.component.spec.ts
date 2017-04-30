import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: FlIconComponent;
  let fixture: ComponentFixture<FlIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
