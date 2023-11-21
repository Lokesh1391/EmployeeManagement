import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | null = null;

  selectedTabIndex = 0;

  technicalSkills: string[] = [];
  skillList: string[] = ['JAVA', 'REACT', 'SPRINGBOOT', 'ANGULARJS','ANGULAR','MYSQL'];

  departments: string[] = ['PSG', 'ISF', 'IMS'];
  designations: string[] = ['Trainee', 'Junior Associate', 'Associate', 'Manager'];


  personalInfoForm: FormGroup;
  employeeDetailsForm: FormGroup;
  documentsForm: FormGroup;

  personalInfoFormData: any;
  employeeDetailsFormData: any;
  personalInfoEmployeeName: string = '';

  employees: Employee[] = [];
  private apiUrl = 'http://localhost:8080/employee/';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      employeeName: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      technicalSkills: [[], Validators.required],
    });

    this.employeeDetailsForm = this.fb.group({
      employeeCode: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.documentsForm = this.fb.group({
    });

  }

  get personalInfoFormControls() {
    return this.personalInfoForm.controls;
  }

  get employeeDetailsFormControls() {
    return this.employeeDetailsForm.controls;
  }

  ngOnInit(): void {
    this.getAllEmployees();

 
  }

  getAllEmployees() {
    this.http.get<Employee[]>(`${this.apiUrl}`).subscribe(
      (response) => {
        this.employees = response;
      },
    );
  }


  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log('Submit Clicked:');
    console.log('Employees last:', this.employees);
    console.log('personalInfoForm value:', this.personalInfoForm.value);
    console.log('employeeDetailsForm value:', this.employeeDetailsForm.value);

    if (this.personalInfoForm.valid && this.employeeDetailsForm.valid) {

      const formData = new FormData();

      const employeeData = {
        personalInfo: this.personalInfoForm.value,
        employeeDetails: this.employeeDetailsForm.value,
      };
      formData.append('employeeData', new Blob([JSON.stringify(employeeData)], { type: 'application/json' }));


      if (this.fileInput) {
        const file = this.fileInput.nativeElement.files[0];
        if (file) {
          formData.append('file', file);
        }
      }
      console.log('formData:', formData);


      const headers = new HttpHeaders();

      this.http.post<Employee[]>(`${this.apiUrl}`, formData, { headers }).subscribe({
        next: (respons) => {
          console.log('Employee created:', respons);
          Swal.fire({
            title: 'Success!',
            text: 'Your data has been saved.',
            icon: 'success',
          });
          this.clear();
        },
        error: (error) => {
          console.error('Error creating employee:', error);
        }
      });
    } else {
      this.personalInfoForm.markAllAsTouched();
      this.employeeDetailsForm.markAllAsTouched();
      this.documentsForm.markAllAsTouched();
    }
  }

  clear() {
    this.personalInfoForm.reset();
    this.technicalSkills = [];
  }
  clearSecondTab() {
    this.employeeDetailsForm.reset();
  }
  clearThirdTab() {
    this.documentsForm.reset();
  }

  reload() {
    location.reload();
  }

  nextTab() {
    if (this.personalInfoForm.valid) {
      this.personalInfoFormData = this.personalInfoForm.value;
      this.personalInfoEmployeeName = this.personalInfoForm.value.employeeName;
      console.log("personalInfoEmployeeName...", this.personalInfoEmployeeName);
      console.log("Next with form filled value....", this.personalInfoForm.value);
      this.selectedTabIndex++;
    } else {
      this.personalInfoForm.markAllAsTouched();
    }
  }

  nextTabSecond() {
    console.log("Next with form filled value employeeDetailsForm:....", this.employeeDetailsForm.value);
    if (this.employeeDetailsForm.valid) {
      this.employeeDetailsFormData = this.employeeDetailsForm.value;
      this.selectedTabIndex++;
    } else {
      this.employeeDetailsForm.markAllAsTouched();
    }

  }
  backTab() {
    this.selectedTabIndex--;
  }
}
