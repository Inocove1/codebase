import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandcontentComponent } from './brandcontent.component';

describe('BrandcontentComponent', () => {
  let component: BrandcontentComponent;
  let fixture: ComponentFixture<BrandcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
