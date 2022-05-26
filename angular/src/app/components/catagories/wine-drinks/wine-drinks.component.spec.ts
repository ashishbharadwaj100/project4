import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDrinksComponent } from './wine-drinks.component';

describe('WineDrinksComponent', () => {
  let component: WineDrinksComponent;
  let fixture: ComponentFixture<WineDrinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineDrinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
