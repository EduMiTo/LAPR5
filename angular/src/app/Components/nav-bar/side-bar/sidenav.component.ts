import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SideNavComponent implements OnInit {
  warehouse = false;
  shipping = false;
  logistic = false;
  admin = false;

  constructor() { }

  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    var userRole = payLoad.role;

    
    
    if(userRole == 'ec89216d-dd33-4822-b80e-40bd910dfbd2'){
      this.warehouse = true;
    }
    else if(userRole == '0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3'){
      this.shipping = true;
    }
    else if(userRole == '765784b7-7b42-4e9e-bf9f-58bc5439cb25'){
      this.logistic = true;
    }else if (userRole == '609dce1d-b1a0-4898-b490-2738b963c67f'){
      this.admin = true;
    }
    }

    
  }

