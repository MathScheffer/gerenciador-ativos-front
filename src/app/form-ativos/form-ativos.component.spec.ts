import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtivosComponent } from './form-ativos.component';

describe('FormAtivosComponent', () => {
  let component: FormAtivosComponent;
  let fixture: ComponentFixture<FormAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAtivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
