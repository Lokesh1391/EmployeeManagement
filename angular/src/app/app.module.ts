import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,FormControl} from '@angular/forms';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { MatDialogModule } from '@angular/material/dialog';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,MatInputModule,FormsModule,
    MatRadioModule,
    MdbFormsModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule ,
    MatSidenavModule,
    SweetAlert2Module.forRoot(),
    MatDialogModule
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
