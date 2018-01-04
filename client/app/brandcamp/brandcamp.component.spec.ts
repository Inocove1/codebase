import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandcampComponent } from './brandcamp.component';

describe('BrandcampComponent', () => {
  let component: BrandcampComponent;
  let fixture: ComponentFixture<BrandcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
