import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerprofileComponent } from './influencerprofile.component';

describe('InfluencerprofileComponent', () => {
  let component: InfluencerprofileComponent;
  let fixture: ComponentFixture<InfluencerprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
