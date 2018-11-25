import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CourseService } from '../_services/course.service';
import { Course } from '../_model/course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user: any;
courses: any = [];
classes: any = [];
courseCreate: any;
showname: any = {
};
edit: Course = {};

  constructor(
    private userService: UserService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private course: CourseService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    console.log('hey');
    this.getAllCourses();
  }

  getAllCourses() {
    this.course.getAllcourses()
    .subscribe(res => {
      this.courses = res;
    });
  }

  getClasses(id) {
    this.router.navigate(['/dashboard/courses/' + id + '/classes']);
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  cancel(id) {
    this.edit.name = null;
    this.showname[id] = false;
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0px';
  }

  logout() {
    this.userService.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
  }

  createCourse() {
    this.router.navigate(['/dashboard/course/create']);
  }

  editCourse(id) {
    console.log('heyy');
    this.course.editCourse(id, this.edit.name)
    .subscribe(res => {
      this.getAllCourses();
      this.showname[id] = false;
    });
  }

  deleteCourse(id) {
    this.course.deleteCourse(id)
    .subscribe(res => {
      this.getAllCourses();
    });
  }
}
