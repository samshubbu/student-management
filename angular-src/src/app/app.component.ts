import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;
  title = 'angular-src';

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
