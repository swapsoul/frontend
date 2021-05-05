import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDeliveryPolicyComponent } from './shipping-delivery-policy.component';

describe('ShippingDeliveryPolicyComponent', () => {
  let component: ShippingDeliveryPolicyComponent;
  let fixture: ComponentFixture<ShippingDeliveryPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingDeliveryPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDeliveryPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
