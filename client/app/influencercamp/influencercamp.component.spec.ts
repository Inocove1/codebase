import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencercampComponent } from './influencercamp.component';

describe('InfluencercampComponent', () => {
  let component: InfluencercampComponent;
  let fixture: ComponentFixture<InfluencercampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencercampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencercampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
