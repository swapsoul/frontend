import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyUpperComponent } from './body-upper.component';

describe('BodyUpperComponent', () => {
  let component: BodyUpperComponent;
  let fixture: ComponentFixture<BodyUpperComponent>;

  beforeEach(async(() => {
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
