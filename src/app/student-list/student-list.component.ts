import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { StudentService } from '../student.service';
import { Student } from './../shared/Student/Student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  students: Observable<Student[]>
  student: Student = new Student();
  deleteMessage = false;
  studentList: any;
  isUpdated = false;

  ngOnInit(): void {
    this.isUpdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu:[[6,16,20,-1],[6,16,20,"All"]],
      processing: true
    };
    this.studentService.getStudentList().subscribe(
      data => {
        this.students = data;
        this.dtTrigger.next();
      }
    )
  }

  deleteStudent(id: number){
    this.studentService.deleteStudent(id).subscribe(
      data => {
        console.log(data);
        this.deleteMessage = true;
        this.studentService.getStudentList().subscribe(data =>{ this.students = data});
      },
      error => console.log(error)
    );
  }

  getUpdateStudent(id: number){
    this.studentService.getStudent(id).subscribe(
      data => { this.studentList = data},
      error => console.log(error));
  }

  studentUpdateForm=new FormGroup({  
    student_id:new FormControl(),  
    student_name:new FormControl(),  
    student_email:new FormControl(),  
    student_branch:new FormControl()  
  });

  updateStudent(updstu){
    this.student=new Student();   
    this.student.student_id=this.StudentId.value;  
    this.student.student_name=this.StudentName.value;  
    this.student.student_email=this.StudentEmail.value;  
    this.student.student_branch=this.StudentBranch.value;  
    console.log(this.StudentBranch.value);

    this.studentService.updateStudent(this.student.student_id, this.student).subscribe(
      data => {
        this.isUpdated = true;
        this.studentService.getStudentList().subscribe(data =>{ this.students = data})
      },
      error => console.log(error));
  }

  get StudentName(){  
    return this.studentUpdateForm.get('student_name');  
  }  
  
  get StudentEmail(){  
    return this.studentUpdateForm.get('student_email');  
  }  
  
  get StudentBranch(){  
    return this.studentUpdateForm.get('student_branch');  
  }  
  
  get StudentId(){  
    return this.studentUpdateForm.get('student_id');  
  }  

  changeIsUpdate(){
    this.isUpdated = false;
  }
}
