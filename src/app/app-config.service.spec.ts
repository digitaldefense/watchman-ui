import { TestBed, inject } from '@angular/core/testing';

import { AppConfig2 } from './app-config.service';

describe('AppConfig2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfig2]
    });
  });

  it('should ...', inject([AppConfig2], (service: AppConfig2) => {
    expect(service).toBeTruthy();
  }));
});
