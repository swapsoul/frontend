import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeReturnPolicyComponent } from './exchange-return-policy.component';

describe('ExchangeReturnPolicyComponent', () => {
  let component: ExchangeReturnPolicyComponent;
  let fixture: ComponentFixture<ExchangeReturnPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeReturnPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
