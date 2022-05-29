import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetListEntryComponent } from './pet-list-entry.component';

describe('PetListEntryComponent', () => {
  let component: PetListEntryComponent;
  let fixture: ComponentFixture<PetListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
