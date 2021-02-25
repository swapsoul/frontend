import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleproductpagesampleComponent } from './singleproductpagesample.component';

describe('SingleproductpagesampleComponent', () => {
  let component: SingleproductpagesampleComponent;
  let fixture: ComponentFixture<SingleproductpagesampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleproductpagesampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleproductpagesampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
