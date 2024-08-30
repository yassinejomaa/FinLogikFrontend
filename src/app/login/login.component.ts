import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/services/auth-state.service';
import { AuthService } from 'src/services/auth.service';
import { PorteFeuilleVirtuelleService } from 'src/services/porte-feuille-virtuelle.service';
import { TokenService } from 'src/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  errors: any = null;
  

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState:AuthStateService,
    private PS:PorteFeuilleVirtuelleService

  ) {
    this.registerForm = this.fb.group({
      name: [''],
      lastName: [''],
      role: [''],
      email: [''],
      password: [''],
    });

    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }
  ngOnInit() { 
    
  }

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
        console.log(result.token[0])
        const Data = {
          nom: "porte Feuille de base",
          valeur: 50000,
          userID: result.user_id,
          
          
        };
        this.PS.onSave(Data).subscribe(()=>{
          
        })

      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['/']);
      }
    );

  }

 /* onLogin() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
        console.log(result.user)
        localStorage.setItem("userName",result.user.name);
        localStorage.setItem("userId",result.user.id);
        localStorage.setItem("prenom",result.user.prenom);
        localStorage.setItem("user", JSON.stringify(result.user));   
         console.log(localStorage.getItem("user"))
        if(result.user.role=="admin"){
          this.router.navigate(['salles']);
        }
        else{
          this.router.navigate(['main']);
        }
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        
        
      }
    );
  }
  // Handle response
  responseHandler(data: any) {
    this.token.handleData(data.access_token);
    localStorage.setItem("token", this.token.toString());
    console.log(localStorage.getItem("token"))
  }
*/
onLogin() {
  this.authService.signin(this.loginForm.value).subscribe(
    (result) => {
      this.responseHandler(result);
      this.authState.setAuthState(true);
      this.loginForm.reset();
      localStorage.setItem("userName", result.user.name);
      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("prenom", result.user.lastName);
      localStorage.setItem("user", JSON.stringify(result.user));

      console.log(localStorage.getItem("userName"));
      
      if (result.user.role === "admin") {
        this.router.navigate(['dashbordAdmin']);
      } else {
        this.router.navigate(['/']);
      }

    },
    (error) => {
      this.errors = error.error;
    }
  );
}

// Handle response
responseHandler(data: any) {
  this.token.handleData(data.access_token);
}
}
