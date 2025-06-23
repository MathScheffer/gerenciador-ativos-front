import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IMqttServiceOptions } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gerenciador-ativos-front';
  aparecerHeader = true


  constructor(private route: Router){
    route.events.subscribe(e => {
      if(e instanceof NavigationEnd && e.url === '/login'){
        this.aparecerHeader = false
        console.log('desaparecer header')
      }else if(e instanceof NavigationEnd && e.url !== '/login'){
this.aparecerHeader = true
      }
    })
  }
}
