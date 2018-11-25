import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
    private router: Router,
    private userService: UserService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  login() {
    this.userService.authenticateUser(this.model)
    .subscribe(data => {
      if (data.success) {
        this.userService.storeUser(data.token, data.user);

        this.flashMessage.show('You are succesfully Logged In..', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show('wrong username or Password', {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}
