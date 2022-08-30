import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarProductsPageComponent } from './searchbar-products-page.component';

describe('SearchbarProductsPageComponent', () => {
  let component: SearchbarProductsPageComponent;
  let fixture: ComponentFixture<SearchbarProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarProductsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
