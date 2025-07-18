import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEmployeeModal } from './create-update-employee-modal';

describe('CreateUpdateEmployeeModal', () => {
  let component: CreateUpdateEmployeeModal;
  let fixture: ComponentFixture<CreateUpdateEmployeeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateEmployeeModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateEmployeeModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
