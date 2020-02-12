import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArancibiaComponent } from './arancibia.component';

describe('ArancibiaComponent', () => {
  let component: ArancibiaComponent;
  let fixture: ComponentFixture<ArancibiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArancibiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArancibiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
