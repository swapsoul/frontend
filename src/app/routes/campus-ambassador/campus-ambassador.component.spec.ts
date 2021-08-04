import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusAmbassadorComponent } from './campus-ambassador.component';

describe('CampusAmbassadorComponent', () => {
  let component: CampusAmbassadorComponent;
  let fixture: ComponentFixture<CampusAmbassadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusAmbassadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusAmbassadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
