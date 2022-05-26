import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilknEggsComponent } from './milkn-eggs.component';

describe('MilknEggsComponent', () => {
  let component: MilknEggsComponent;
  let fixture: ComponentFixture<MilknEggsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilknEggsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilknEggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
