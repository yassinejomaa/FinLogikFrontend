import { Component, OnInit } from '@angular/core';
import { PorteFeuilleVirtuelleService } from 'src/services/porte-feuille-virtuelle.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css',
    "../../assets/css/style.css",
    "../../assets/css/responsive.css",
    "../../assets/css/bootstrap.css",
  ]
})
export class WalletsComponent implements OnInit{
  idUser=localStorage.getItem("userId");
  prenom=localStorage.getItem("prenom");
  nom=localStorage.getItem("userName");
  token1 = localStorage.getItem('token');
  porteFeuilles: any[] = [];
  responsiveOptions!: any[];
  constructor(
    
    private PS: PorteFeuilleVirtuelleService,
    
  ) {}
  ngOnInit(): void {

    this.PS.getPortefeuilleUser(this.idUser).subscribe((data)=>{
      this.porteFeuilles=data;
      console.log(this.porteFeuilles)
    })
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    
  }
}
