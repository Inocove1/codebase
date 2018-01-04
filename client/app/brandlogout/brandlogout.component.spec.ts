import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandlogoutComponent } from './brandlogout.component';

describe('BrandlogoutComponent', () => {
  let component: BrandlogoutComponent;
  let fixture: ComponentFixture<BrandlogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandlogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
