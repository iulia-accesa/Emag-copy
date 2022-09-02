import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartBoxComponent } from './add-to-cart-box.component';

describe('AddToCartBoxComponent', () => {
  let component: AddToCartBoxComponent;
  let fixture: ComponentFixture<AddToCartBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
