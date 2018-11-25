import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Course } from '../_model/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
classes: any = [];
id;
showname: any = {};
edit: Course = {};
newClassName: String = null;
showCreate: Boolean = false;
  constructor(
    private course: CourseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log('hey');

    this.getAllClasses();
  }

  getAllClasses() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.course.getAllClasses(this.id)
      .subscribe(result => {
        this.classes = result;
      });
    });
  }

  navigateToStudent(studentId) {
    this.router.navigate(['/dashboard/classes/' + studentId + '/students']);
  }

  createClass() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      console.log(this.newClassName);
      this.course.createClass(this.id, this.newClassName).subscribe(res => {
        this.newClassName = null;
        this.showCreate = false;
        this.getAllClasses();
      });
    });
  }

  cancel() {
    this.newClassName = null;
    this.showCreate = false;
  }

  getStudents(id) {
    this.router.navigate(['/dashboard/classes/' + id + '/students']);
  }

  editClass(id) {
    console.log('heyy');
    this.course.editClass(id, this.edit.name)
    .subscribe(res => {
      this.getAllClasses();
      this.showname[id] = false;
    });
  }

  deleteClass(id) {
    this.course.deleteClass(id)
    .subscribe(res => {
      this.getAllClasses();
    });
  }
}
