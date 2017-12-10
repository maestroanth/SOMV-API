import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceSelectorSubFormComponent } from './race-selector-sub-form.component';

describe('RaceSelectorSubFormComponent', () => {
  let component: RaceSelectorSubFormComponent;
  let fixture: ComponentFixture<RaceSelectorSubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceSelectorSubFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceSelectorSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
