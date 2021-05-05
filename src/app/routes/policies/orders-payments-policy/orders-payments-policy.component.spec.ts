import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPaymentsPolicyComponent } from './orders-payments-policy.component';

describe('OrdersPaymentsPolicyComponent', () => {
  let component: OrdersPaymentsPolicyComponent;
  let fixture: ComponentFixture<OrdersPaymentsPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPaymentsPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPaymentsPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
