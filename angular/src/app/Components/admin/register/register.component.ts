import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { generate } from 'rxjs';
import { ILoginUser } from 'src/app/interfaces/iloginuser';
import { IRole } from 'src/app/interfaces/irole';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','./register.component.scss']})
export class RegisterComponent implements OnInit {

  roles: IRole[] = [];
  submitted = false;
  error = false;
  message = '';
  gmail = false;
  generatedPassword = '';

  sideBarOpen = true;
  role: IRole;
  user!: ILoginUser;
  match = true;
  @ViewChild('myDialog', { static: true })
  myDialog!: TemplateRef<any>;

  userData=false;



  emailIsGmail(value: string){

   if (value !=null && value.endsWith("@gmail.com")) {
     this.gmail = true;

     const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:\'",.<>?/';

     for (let i = 0; i < 50; i++) {
       const index = Math.floor(Math.random() * validChars.length);
       this.generatedPassword += validChars[index];
     }
 
   }else{
      this.gmail = false;
   }
    
  }

  onChange(){
    this.userData= !this.userData;
  }
  
  openDialogWithoutRef() {
    this.dialog.open(this.myDialog);

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private service: UserServiceService, private dialog: MatDialog) { 
    this.role = {
      id: '',
      name: ''
    };

    this.user = {
      domainId: "",
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      phone: ''
  }
}

  ngOnInit(): void {
    this.getRoles();
  }

  registerUser(data: any){
    if (this.match === true) {

      if (this.gmail === true) {
        data.password = this.generatedPassword;
      }

      this.service.registerUser({
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "password": data.password,
        "role": data.name,
        "phone": data.phone
      }as ILoginUser).subscribe((user) => {
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.user.email = data.email;
          this.user.phone = data.phone;
          this.submitted = true;  
          this.error = false;
          this.gmail = false;
        },
        (error) => {
          this.error = true;
          this.message = error.error;
        }
      );    
    }else
    {
      this.submitted = false;
      this.error = true;
      this.message = "Passwords do not match!";
    }
  }

  getRolesByName(role: string): void {
    this.service.getRoleByName(role).subscribe(
    (role) =>  this.role = role);
  }
    
  getRoles(): void {
    this.service.getRoles().subscribe(
    (roles) =>  this.roles = roles);
  }

  validatePassword(password: string, confirmPassword: string): void {

    if(password === confirmPassword){
      this.match = true;
    }else {
      this.match = false;
    }  
  }

}
