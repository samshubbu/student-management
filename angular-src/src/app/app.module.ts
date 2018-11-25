import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './_services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_guard/auth.service';
import { ClassComponent } from './class/class.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';
import { CreateCourseComponent } from './create-course/create-course.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ClassComponent,
    CourseComponent,
    StudentComponent,
    CreateCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthService]
      },
      {
        path: 'dashboard/course/create',
        component: CreateCourseComponent,
        canActivate: [AuthService]
      },
      {
        path: 'dashboard/courses/:id/classes',
        component: CourseComponent,
        canActivate: [AuthService]
      },
      {
        path: 'dashboard/classes/:id/students',
        component: StudentComponent,
        canActivate: [AuthService]
      },
      {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
