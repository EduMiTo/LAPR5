import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  user:any;
  loggedIn: any;

  message:string;
  error=false;
  
  constructor(private authenticationService : AuthenticationService, private socialAuthService: SocialAuthService, private router: Router, private route : ActivatedRoute) { 
    
      this.message="";

  }

  ngOnInit() {

    if (localStorage.getItem('token') != null){
      if(this.authenticationService.roleMatch(['ec89216d-dd33-4822-b80e-40bd910dfbd2'])){
        this.router.navigateByUrl('/warehouse-management');
      }else if ( this.authenticationService.roleMatch(['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3'])){
        this.router.navigateByUrl('/shipping-management');
      }else if (this.authenticationService.roleMatch(['765784b7-7b42-4e9e-bf9f-58bc5439cb25'])){
        this.router.navigateByUrl('/logistic-management');
      }else if (this.authenticationService.roleMatch(['609dce1d-b1a0-4898-b490-2738b963c67f'])){
        this.router.navigateByUrl('/admin');
    } 
    }
  
    this.socialAuthService.authState.subscribe((data: any) => {


      const email = data.email;
      this.authenticationService.verifyIfUserExists(email).subscribe((user: any) => {

        localStorage.setItem('token', user.token);
        var id = this.getId();
        localStorage.setItem('id', id);
        if(this.authenticationService.roleMatch(['ec89216d-dd33-4822-b80e-40bd910dfbd2'])){
          this.router.navigateByUrl('/warehouse-management');
        }else if ( this.authenticationService.roleMatch(['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3'])){
          this.router.navigateByUrl('/shipping-management');
        }else if (this.authenticationService.roleMatch(['765784b7-7b42-4e9e-bf9f-58bc5439cb25'])){
          this.router.navigateByUrl('/logistic-management');
        }else if (this.authenticationService.roleMatch(['609dce1d-b1a0-4898-b490-2738b963c67f'])){
          this.router.navigateByUrl('/admin');
      }  
    },
      err => {
        this.error = true;
        this.message = "Username or password is incorrect";
      });
    });
};
  

  getId(): string {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1] ));
    var userId = payLoad.UserID;
    return userId;
  }

  loginUser(email: string, password: string){
    this.authenticationService.login(email, password).subscribe((data : any) => {
      localStorage.setItem('token', data.token);
      var id = this.getId();
      localStorage.setItem('id', id);
      if(this.authenticationService.roleMatch(['ec89216d-dd33-4822-b80e-40bd910dfbd2'])){
        this.router.navigateByUrl('/warehouse-management');
      }else if ( this.authenticationService.roleMatch(['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3'])){
        this.router.navigateByUrl('/shipping-management');
      }else if (this.authenticationService.roleMatch(['765784b7-7b42-4e9e-bf9f-58bc5439cb25'])){
        this.router.navigateByUrl('/logistic-management');
      }else if (this.authenticationService.roleMatch(['609dce1d-b1a0-4898-b490-2738b963c67f'])){
        this.router.navigateByUrl('/admin');
    }  
  },
    err => {
      this.error = true;
      this.message = "Username or password is incorrect";
    });

  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    
    }
  }


