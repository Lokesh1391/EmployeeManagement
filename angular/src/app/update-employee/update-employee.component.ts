import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../employee';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {

  public employeeName:string;
 public mobile: string;
 public gender: string;
 public technicalSkills: [string];
 public address: string;
 public employeeCode: string;
 public department: string;
 public designation: string;
 public email: string;

 


//  @ViewChild(EmployeeListComponent) employee!: EmployeeListComponent;

  constructor(
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    // private employee : EmployeeListComponent,
    private employee : EmployeeService,private router: Router
    
    ) {

      
    }

   
    ngOnInit(): void {
      console.log(this.data.id);
        this.employee.getById(this.data.id).subscribe((emp: Employee) =>{
          console.log(this.data.id);
          
          this.employeeName = emp.employeeName;
          this.mobile = emp.mobile;
          this.gender = emp.gender;
          // this.technicalSkills = emp.technicalSkills;
          this.address = emp.address;
          this.employeeCode = emp.employeeCode;
          this.department = emp.department;
          this.designation = emp.designation;
          this.email = emp.email;
        })

       
    }

  openDialog(): void {
   const updateEmployee ={
    id: this.data.id,
    employeeName: this.employeeName,
    mobile: this.mobile,
    gender: this.gender,
    // technicalSkills : this.data.technicalSkills,
    address: this.address,
    employeeCode: this.employeeCode,
    department: this.department,
    designation: this.designation,
    email: this.email
   }
   this.employee.updateEmployee(updateEmployee).subscribe((response)=>{
    console.log('updated successfully:',response);
    Swal.fire({
      title: 'Updated Success!',
      text: 'Your data has been .',
      icon: 'success',
      
    });
    window.location.reload();
    this.dialogRef.close(updateEmployee)

   })
  

// this.dialogRef.close(updateEmployee);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  // onDeleteEmployee(id: number): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You are about to delete this employee.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.employee.deleteEmployee(id).subscribe(
  //         () => {
  //           console.log('Employee deleted successfully');
  //           Swal.fire({
  //             title: 'Deleted!',
  //             text: 'Employee has been deleted.',
  //             icon: 'success',
  //           }).then(() => {
  //             this.router.navigateByUrl('/employeesList', { skipLocationChange: true }).then(() => {
  //               this.router.navigate(['/employeesList']);
  //             });
  //           });
  //           // this.dialogRef.close();
  //         },
  //         (error) => {
  //           console.error('Error deleting employee:', error);
  //           // Handle error cases or show an error message
  //         }
  //       );
  //     }
  //   });
  // }

}
