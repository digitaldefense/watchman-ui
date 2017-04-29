import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteframesPageComponent } from './whiteframes-page.component';

describe('WhiteframesPageComponent', () => {
  let component: WhiteframesPageComponent;
  let fixture: ComponentFixture<WhiteframesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteframesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteframesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
