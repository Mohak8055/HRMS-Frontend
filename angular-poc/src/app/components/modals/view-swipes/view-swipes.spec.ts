import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSwipes } from './view-swipes';

describe('ViewSwipes', () => {
  let component: ViewSwipes;
  let fixture: ComponentFixture<ViewSwipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSwipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSwipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
