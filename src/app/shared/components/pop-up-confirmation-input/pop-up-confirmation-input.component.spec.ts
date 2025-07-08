import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpConfirmationInputComponent } from './pop-up-confirmation-input.component';

describe('PopUpConfirmationInputComponent', () => {
  let component: PopUpConfirmationInputComponent;
  let fixture: ComponentFixture<PopUpConfirmationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpConfirmationInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpConfirmationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
