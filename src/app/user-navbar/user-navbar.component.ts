import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/services/auth-state.service';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css',
  "../../assets/css/style.css",
  "../../assets/css/responsive.css",
  "../../assets/css/bootstrap.css",]
})
export class UserNavbarComponent implements OnInit {

  idUser=localStorage.getItem("userId");
  prenom=localStorage.getItem("prenom");
  nom=localStorage.getItem("userName");
  token1 = localStorage.getItem('token');
  constructor(
    public router: Router,
    
    public authService: AuthService,
    private token: TokenService,
    private authState:AuthStateService,

  ){}

  ngOnInit(): void {
    console.log(this.idUser);
    this.token1 = this.token.getToken();
    console.log(this.token);
  }
  logout() {
      this.authState.setAuthState(false);
      this.token.removeToken();
      this.idUser=null;
      this.router.navigate(['/login']);
      console.log(this.token.getToken());
    }
    
  
  

}
