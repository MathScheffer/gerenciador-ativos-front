import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteMqttComponent } from './teste-mqtt.component';

describe('TesteMqttComponent', () => {
  let component: TesteMqttComponent;
  let fixture: ComponentFixture<TesteMqttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TesteMqttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
