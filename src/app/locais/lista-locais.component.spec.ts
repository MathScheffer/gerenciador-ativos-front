import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisComponent } from './lista-locais.component';

describe('LocaisComponent', () => {
  let component: LocaisComponent;
  let fixture: ComponentFixture<LocaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
