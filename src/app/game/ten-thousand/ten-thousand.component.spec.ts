import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenThousandComponent } from './ten-thousand.component';

describe('TenThousandComponent', () => {
  let component: TenThousandComponent;
  let fixture: ComponentFixture<TenThousandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenThousandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenThousandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
