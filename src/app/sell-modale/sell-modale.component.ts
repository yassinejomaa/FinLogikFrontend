import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceApiService } from 'src/services/finance-api.service';
import { PorteFeuilleVirtuelleService } from 'src/services/porte-feuille-virtuelle.service';
import { TransactionsService } from 'src/services/transactions.service';

@Component({
  selector: 'app-sell-modale',
  templateUrl: './sell-modale.component.html',
  styleUrls: ['./sell-modale.component.css']
})
export class SellModaleComponent implements OnInit{

  visible: boolean = false;
  @Input() actif!: any;
  @Input() id!: any;
  prixTotal!:any;
  formGroup!: FormGroup;
  quantuite!:any;
  userID=localStorage.getItem("userId");
  currentDate = new Date();

  formattedDate = this.currentDate.toISOString().split('T')[0];


  
  constructor(
    private service: FinanceApiService,
    private PS: PorteFeuilleVirtuelleService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private TS: TransactionsService
  ) {}
  
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      limit: new FormControl(null, [Validators.required]), 
    });
  }
    showDialog() {
        this.visible = true;
    }
    sell(){
      if (this.formGroup.valid) {  // Vérifie que le formulaire est valide
        this.service.summary(this.actif.NomActif).subscribe((data: any) => { 
          const Data = {
            actif: this.actif.NomActif,
            TypeTransaction: "sell",
            quantuite: this.formGroup.get('limit')?.value,
            date: this.formattedDate,
            prixTotal: data.data[0].quote.ask * this.formGroup.get('limit')?.value,
            limitBuy: null,
            limitBuyPrice: null,
            userID: this.userID,
            buyOrsell: "sell",
            porteFeuilleID:this.id,
          };
    
          console.log(Data)
          this.TS.onSave(Data).subscribe(() => {

            this.PS.sell(this.id, Data.prixTotal).subscribe(() => {
              console.log(Data.prixTotal);
            });
          });
        });
      } else {
        console.error('Le formulaire est invalide');
      }
    }
    
}
