import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestTab } from './leave-request-tab';

describe('LeaveRequestTab', () => {
  let component: LeaveRequestTab;
  let fixture: ComponentFixture<LeaveRequestTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
