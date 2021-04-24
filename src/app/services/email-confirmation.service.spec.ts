import { TestBed } from '@angular/core/testing';

import { EmailConfirmationService } from './email-confirmation.service';

describe('EmailConfirmationService', () => {
  let service: EmailConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
