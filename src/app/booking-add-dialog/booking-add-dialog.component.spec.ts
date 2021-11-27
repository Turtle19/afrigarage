import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAddDialogComponent } from './booking-add-dialog.component';

describe('BookingAddDialogComponent', () => {
  let component: BookingAddDialogComponent;
  let fixture: ComponentFixture<BookingAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
