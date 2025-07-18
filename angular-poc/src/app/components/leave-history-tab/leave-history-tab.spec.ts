import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryTab } from './leave-history-tab';

describe('LeaveHistoryTab', () => {
  let component: LeaveHistoryTab;
  let fixture: ComponentFixture<LeaveHistoryTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveHistoryTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveHistoryTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
