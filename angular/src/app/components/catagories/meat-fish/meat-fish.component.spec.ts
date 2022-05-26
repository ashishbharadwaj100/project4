import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatFishComponent } from './meat-fish.component';

describe('MeatFishComponent', () => {
  let component: MeatFishComponent;
  let fixture: ComponentFixture<MeatFishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatFishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
