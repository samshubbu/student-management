import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_model/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  courseCreate: Course = {};
  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.courseService.createCourse(this.courseCreate.name)
    .subscribe(res => {
      this.router.navigate(['/dashboard']);
    });
  }
}
