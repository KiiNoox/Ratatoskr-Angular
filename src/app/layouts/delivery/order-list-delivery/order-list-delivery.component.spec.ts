import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListDeliveryComponent } from './order-list-delivery.component';

describe('OrderListDeliveryComponent', () => {
  let component: OrderListDeliveryComponent;
  let fixture: ComponentFixture<OrderListDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
