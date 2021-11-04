import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRDVComponent } from './dialog-rdv.component';

describe('DialogRDVComponent', () => {
  let component: DialogRDVComponent;
  let fixture: ComponentFixture<DialogRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRDVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
