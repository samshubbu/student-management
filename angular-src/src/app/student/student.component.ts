import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../_model/course';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
students: any = [];
id;
showname: any = {};
edit: Course = {};
newClassName: String = null;
showCreate: Boolean = false;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private course: CourseService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.getStudents(id);
    });

  }

  getStudents(classId) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    this.http.get<any>('http://localhost:5000/students?class_id=' + classId, {headers})
    .subscribe(res => {
      this.students = res.students;
    });
  }

  createStudent() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      console.log(this.newClassName);
      this.course.createStudent(this.id, this.newClassName).subscribe(res => {
        this.newClassName = null;
        this.showCreate = false;
        this.getStudents(this.id);
      });
    });
  }

  cancel() {
    this.newClassName = null;
    this.showCreate = false;
  }

  editStudent(id) {
    console.log('heyy');
    this.course.editStudent(id, this.edit.name)
    .subscribe(res => {
      this.getStudents(this.id);
      this.showname[id] = false;
    });
  }

  deleteStudent(id) {
    this.course.deleteStudent(id)
    .subscribe(res => {
      this.getStudents(id);
    });
  }
}
