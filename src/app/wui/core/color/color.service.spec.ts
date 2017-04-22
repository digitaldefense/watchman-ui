import { TestBed, inject } from '@angular/core/testing';

import { WuiColorService } from './color.service';

describe('WuiColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WuiColorService]
    });
  });

  it('should ...', inject([WuiColorService], (service: WuiColorService) => {
    expect(service).toBeTruthy();
  }));
});
