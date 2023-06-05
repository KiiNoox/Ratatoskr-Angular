import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryProductsComponent } from './inquiry-products.component';

describe('InquiryProductsComponent', () => {
  let component: InquiryProductsComponent;
  let fixture: ComponentFixture<InquiryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
