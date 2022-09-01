import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSearchEngineComponent } from './product-list-search-engine.component';

describe('ProductListSearchEngineComponent', () => {
  let component: ProductListSearchEngineComponent;
  let fixture: ComponentFixture<ProductListSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListSearchEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
