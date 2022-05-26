import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VegetablesFruitsComponent } from './vegetables-fruits.component';

describe('VegetablesFruitsComponent', () => {
  let component: VegetablesFruitsComponent;
  let fixture: ComponentFixture<VegetablesFruitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegetablesFruitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VegetablesFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
