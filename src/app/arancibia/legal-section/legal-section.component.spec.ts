import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalSectionComponent } from './legal-section.component';

describe('LegalSectionComponent', () => {
  let component: LegalSectionComponent;
  let fixture: ComponentFixture<LegalSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
