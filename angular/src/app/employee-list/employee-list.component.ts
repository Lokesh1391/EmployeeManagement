import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { Observable } from 'rxjs';
import{ MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from '../service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements AfterViewInit {



  employees: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>();
  id: number;
  
  constructor(private employeeService: EmployeeService,public dialog: MatDialog  
   ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {

    this.employeeService.getAllEmployee().subscribe((data)=>{
      this.employees = data;
      console.log(this.employees)
      this.dataSource.data = this.employees;
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  updateEmployee(updateData : any){
   const id = updateData.id;
   
   console.log('EDIT');

   const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
    width: '620px',
    data: { id, ...this.employees }, 
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
    
      console.log('Updated Data:', result);
    }
  });
   
  }

  // onDeleteEmployee(id: number): void {
  //   this.employeeService.deleteEmployee(id).subscribe(
  //     (response) => {
  //       console.log('Employee deleted successfully');
  
  //       // Perform any other necessary actions after deletion
  //       Swal.fire({
  //                     title: 'Deleted!',
  //                     text: 'Employee has been deleted.',
  //                     icon: 'success',
  //                   })
  //                   window.location.reload();
  //     },
  //     (error) => {
  //       console.error('Error deleting employee:', error);
  //       // Handle error cases or show an error message
  //     }
  //   );
  // }


onDeleteEmployee(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this employee.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result)=>{
      if(result.isConfirmed){

        this.employeeService.deleteEmployee(id).subscribe(
              (response) => {
                console.log('Employee deleted successfully');
          
                // Perform any other necessary actions after deletion
                Swal.fire({
                              title: 'Deleted!',
                              text: 'Employee has been deleted.',
                              icon: 'success',
                            })
                            window.location.reload();
              },
              (error) => {
                console.error('Error deleting employee:', error);
               
              }
            );

      }
    })

}
}
