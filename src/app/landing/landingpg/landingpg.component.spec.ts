import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LandingpgComponent } from './landingpg.component';

describe('LandingpgComponent', () => {
  let component: LandingpgComponent;
  let fixture: ComponentFixture<LandingpgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
