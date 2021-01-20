import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../shared/Student/Student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  student: Student = new Student();
  submitted = false;

  ngOnInit(): void {
    this.submitted=false;  
  }

  studentSaveForm = new FormGroup({
    student_name: new FormControl('',[Validators.required, Validators.minLength(5)]),
    student_email: new FormControl('',[Validators.required, Validators.email]),
    student_branch: new FormControl()
  })

  saveStudent(saveStudent){  
    this.student=new Student();     
    this.student.student_name=this.StudentName.value;  
    this.student.student_email=this.StudentEmail.value;  
    this.student.student_branch=this.StudentBranch.value;  
    this.submitted = true;  
    this.save();  
  }  
  
  save() {  
    this.studentService.createStudent(this.student)
      .subscribe(data => console.log(data), error => console.log(error));
      this.student = new Student();
  }  
  
  get StudentName(){  
    return this.studentSaveForm.get('student_name');
  }  
  
  get StudentEmail(){  
    return this.studentSaveForm.get('student_email');
  }  
  
  get StudentBranch(){  
    return this.studentSaveForm.get('student_branch');  
  }  
  
  addStudentForm(){  
    this.submitted=false;
    this.studentSaveForm.reset();  
  }  
}
