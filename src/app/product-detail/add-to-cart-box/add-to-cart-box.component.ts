import { Component, Input, AfterViewInit, Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

@Component({
  selector: 'app-add-to-cart-box',
  templateUrl: './add-to-cart-box.component.html',
  styleUrls: ['./add-to-cart-box.component.scss'],
})
export class AddToCartBoxComponent {
  @Input() set product(value: IProductApi) {
    if (value) {
      this._product = value;
      this.prodRating = Math.round(this._product.rating.rate);
    }
  }
  public _product: IProductApi | undefined;
  public prodRating = 0;

  constructor() {}
}

@Directive({
  selector: '[isVisible]',
})

export class IsVisible implements AfterViewInit {

  constructor(private vcRef: ViewContainerRef, private tplRef: TemplateRef<any>) {
  }
  
  ngAfterViewInit() {
    const observedElement = this.vcRef.element.nativeElement.parentElement
    console.log(this.vcRef.element.nativeElement.parentElement.secondChild)
    const observer = new IntersectionObserver(([entry]) => {
      this.renderContents(entry.isIntersecting)
    })
    observer.observe(observedElement)
  }
  
  renderContents(isIntersecting: boolean) {
    
    this.vcRef.clear()
    
    if (!isIntersecting) {
      this.vcRef.createEmbeddedView(this.tplRef)
      console.log("i'm here")
    } else{
      console.log("i'm not anymore here")
      
    }
  }
}
