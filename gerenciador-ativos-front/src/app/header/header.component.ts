import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
 import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor (private route: Router, private activatedRoute: ActivatedRoute){
    route.events.subscribe(event => {
      if(event instanceof NavigationEnd && event.url==='/login'){
        
      }
    })
  }
}
