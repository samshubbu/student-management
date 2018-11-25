import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  // get All courseslist
  getAllcourses() {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.get<any>('http://localhost:5000/courses/', { headers }).pipe(
      map(res => res.courses)
    );
  }

  // get All classes List
  getAllClasses(courseId) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.get<any>('http://localhost:5000/classes?course_id=' + courseId, { headers }).pipe(
      map(res => res.courseClasses)
    );
  }

  // Create course
  createCourse(name) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.put<any>('http://localhost:5000/courses', {name}, {headers}).pipe(
      map(res => res));
  }

  // edit Course
  editCourse(id, name) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.post<any>('http://localhost:5000/courses', {id: id, details: {name}}, {headers}).pipe(
      map(res => res));
  }

  // Delete Course
  deleteCourse(id) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.delete<any>('http://localhost:5000/courses/' + id, {headers}).pipe(
      map(res => res));
  }

  // Create Class
  createClass(courseId, name) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.put<any>('http://localhost:5000/classes', {name, course_id: courseId}, {headers}).pipe(
      map(res => res));
  }

  // Edit Class
  editClass(courseId, name) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.post<any>('http://localhost:5000/classes', {name, course_id: courseId}, {headers}).pipe(
      map(res => res));
  }

  // Delete Class
  deleteClass(id) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.delete<any>('http://localhost:5000/classes/' + id, {headers}).pipe(
      map(res => res));
  }

  // Create Student
  createStudent(courseId, name) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.put<any>('http://localhost:5000/students', {name, course_id: courseId}, {headers}).pipe(
      map(res => console.log(res)));
  }

  // Edit Student
  editStudent(courseId, name) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.put<any>('http://localhost:5000/students', {name, course_id: courseId}, {headers}).pipe(
      map(res => res));
  }

  // Delete Student
  deleteStudent(id) {
    const headers = new HttpHeaders().set('authorization', localStorage.getItem('id_token'));
    return this.http.delete<any>('http://localhost:5000/students/' + id, {headers}).pipe(
      map(res => res));
  }
}
