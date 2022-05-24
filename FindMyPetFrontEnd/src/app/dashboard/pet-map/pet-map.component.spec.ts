import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetMapComponent } from './pet-map.component';

describe('PetMapComponent', () => {
  let component: PetMapComponent;
  let fixture: ComponentFixture<PetMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
