import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderprodsComponent } from './providerprods.component';

describe('ProviderprodsComponent', () => {
  let component: ProviderprodsComponent;
  let fixture: ComponentFixture<ProviderprodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderprodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderprodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
