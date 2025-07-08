import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpHandleManyErrorsComponent } from './pop-up-handle-many-errors.component';

describe('PopUpHandleManyErrorsComponent', () => {
  let component: PopUpHandleManyErrorsComponent;
  let fixture: ComponentFixture<PopUpHandleManyErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpHandleManyErrorsComponent]
    });
    fixture = TestBed.createComponent(PopUpHandleManyErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
