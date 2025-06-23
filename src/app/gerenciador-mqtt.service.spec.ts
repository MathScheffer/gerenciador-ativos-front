import { TestBed } from '@angular/core/testing';

import { GerenciadorMqttService } from './gerenciador-mqtt.service';

describe('GerenciadorMqttService', () => {
  let service: GerenciadorMqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadorMqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
