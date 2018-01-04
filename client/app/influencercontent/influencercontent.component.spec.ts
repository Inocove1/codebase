import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencercontentComponent } from './influencercontent.component';

describe('InfluencercontentComponent', () => {
  let component: InfluencercontentComponent;
  let fixture: ComponentFixture<InfluencercontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencercontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
