import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/employee/';

  constructor(private http:HttpClient) { }

  getAllEmployee(){
    return this.http.get<Employee[]>(`${this.apiUrl}`)
  }

  getById(id: number): Observable<any>{
    return this.http.get<Employee>(`${this.apiUrl}getbyid/${id}`);
  }


  updateEmployee(updateData: any): Observable<any>{
    const id = updateData.id;
    const updateUrl= `${this.apiUrl}update/${id}`
 return this.http.put(updateUrl,updateData,{responseType: 'text'})
  .pipe(
    catchError((error)=>{
      console.error('Error in Update Employee: ', error);
      return throwError("An error occurs during the update operation")
    })
  )

  }


  deleteEmployee(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}delete/${id}`;
    return this.http.delete(deleteUrl,{responseType:'text'})
  }
    
  }

