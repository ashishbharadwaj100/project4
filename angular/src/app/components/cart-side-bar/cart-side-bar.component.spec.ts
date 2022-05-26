import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSideBarComponent } from './cart-side-bar.component';

describe('CartSideBarComponent', () => {
  let component: CartSideBarComponent;
  let fixture: ComponentFixture<CartSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
