import { Component, OnInit } from '@angular/core';
import { ILoginUser } from 'src/app/interfaces/iloginuser';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-anonymize',
  templateUrl: './anonymize.component.html',
  styleUrls: ['./anonymize.component.css','./anonymize.component.scss']
})
export class AnonymizeComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  users: ILoginUser[] = [];

  user!: ILoginUser;
  selectedUser!: ILoginUser;

  submitted = false;

  constructor(private userService: UserServiceService) {
    this.user = {
      domainId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      phone: ""
    };

    this.selectedUser = {
      domainId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      phone: ""
    };
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        let u: ILoginUser[] = [];
        let userService = this.userService;
        users.forEach(function (value) {
          if (value.firstName != 'Dummy'){
            let role = value.role;
            userService.getRoleNameById(role).subscribe((roleName) => value.role = roleName);
            u.push(value);
          }
        }); 
        this.users = u;
      }
    );
    
  };

  getUserById(id: string){
    for (let user of this.users){
      if (user.domainId == id){
        this.selectedUser = user;
      }
    }
  }

  anonymizeUser(user: string, firstName: string, lastName: string, email: string, password: string, phone: string, role: string) {
    this.userService.anonymizeUser({
      domainId: user,
    } as any).subscribe((user) => {
      this.user.email = user.userDTO.email;
      this.user.firstName = user.userDTO.firstName;
      this.user.lastName = user.userDTO.lastName;
      this.user.phone = user.userDTO.phone;
      this.submitted = true;
    });
  }

}



