import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {
    roles: [
      {name: 'ADMIN', value: 'ADMIN', checked: false}
    ]
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  register() {
    const newModel = {...this.model, roles: this.model.roles.filter(role => role.checked).map(role => role.value) };
    this.userService.register(newModel)
    .subscribe(response => {
        if (response.success) {
          this.flashMessage.show('Successfully Registered Now yo may login..', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
    });
  }

}
