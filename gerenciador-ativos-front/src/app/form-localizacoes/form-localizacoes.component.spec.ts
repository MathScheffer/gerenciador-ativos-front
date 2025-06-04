import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocalizacoesComponent } from './form-localizacoes.component';

describe('FormLocalizacoesComponent', () => {
  let component: FormLocalizacoesComponent;
  let fixture: ComponentFixture<FormLocalizacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLocalizacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLocalizacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
