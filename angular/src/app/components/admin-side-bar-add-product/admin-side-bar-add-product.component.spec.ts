import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSideBarAddProductComponent } from './admin-side-bar-add-product.component';

describe('AdminSideBarAddProductComponent', () => {
  let component: AdminSideBarAddProductComponent;
  let fixture: ComponentFixture<AdminSideBarAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSideBarAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSideBarAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
