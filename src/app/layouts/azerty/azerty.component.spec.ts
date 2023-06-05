import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzertyComponent } from './azerty.component';

describe('AzertyComponent', () => {
  let component: AzertyComponent;
  let fixture: ComponentFixture<AzertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
