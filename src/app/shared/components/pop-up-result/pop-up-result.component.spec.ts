import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpResultComponent } from './pop-up-result.component';

describe('PopUpResultComponent', () => {
  let component: PopUpResultComponent;
  let fixture: ComponentFixture<PopUpResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
