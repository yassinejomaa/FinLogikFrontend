import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/services/auth-state.service';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit{
  offcanvasOpen: boolean = false;
  dropdownOpen: boolean = false;
  isSignedIn!: boolean;

  constructor(private auth:AuthService,

    private AS: AuthStateService,
    public router: Router,
    public TS: TokenService) { }

ngOnInit(): void {


  this.AS.userAuthState.subscribe((val) => {
    this.isSignedIn = val;
  });

}
  toggleOffcanvas() {
    this.offcanvasOpen = !this.offcanvasOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // Ajoutez ici la logique de déconnexion
  }
  signOut() {
    this.AS.setAuthState(false);
    this.TS.removeToken();
    this.router.navigate(['/login']);
    console.log(this.TS.getToken());
  }

}
