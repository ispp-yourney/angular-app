import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationUserComponent } from './confirmation-user.component';

describe('ConfirmationUserComponent', () => {
  let component: ConfirmationUserComponent;
  let fixture: ComponentFixture<ConfirmationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
