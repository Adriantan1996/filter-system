import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesDisplayComponent } from './rules-display.component';

describe('RulesDisplayComponent', () => {
  let component: RulesDisplayComponent;
  let fixture: ComponentFixture<RulesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
