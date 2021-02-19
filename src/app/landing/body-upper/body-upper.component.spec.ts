import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BodyUpperComponent } from './body-upper.component';

describe('BodyUpperComponent', () => {
  let component: BodyUpperComponent;
  let fixture: ComponentFixture<BodyUpperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyUpperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
