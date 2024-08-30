import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceApiService } from 'src/services/finance-api.service';
import { PorteFeuilleVirtuelleService } from 'src/services/porte-feuille-virtuelle.service';
import { TransactionsService } from 'src/services/transactions.service';

@Component({
  selector: 'app-porte-feuille',
  templateUrl: './porte-feuille.component.html',
  styleUrls: ['./porte-feuille.component.css']
})
export class PorteFeuilleComponent implements OnInit {
  constructor(
    private service: FinanceApiService,
    private TS: TransactionsService,
    private PS: PorteFeuilleVirtuelleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  idUser: any;
  id!: any;
  actifPosseder: any[] = [];
  valeurPorteFeuilleTotal!: number;
  ValeurRestant: any;
  valeuractifPosseder: number = 0;




  loading: boolean = true;

    activityValues: number[] = [0, 100];






  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idUser = localStorage.getItem("userId");

    // Appel des méthodes pour mettre à jour les valeurs
    this.valeurPorteFeuille().then(() => {
      this.calculeValeurAchatEtVente().then(() => {
        this.afficherValeurs();  // Appel après les mises à jour
        this.valeurPorteFeuilleTotal=this.ValeurRestant+this.valeuractifPosseder
        console.log(this.actifPosseder)
        console.log(this.valeurPorteFeuilleTotal)
      });
    });
   
 
 
    this.loading = false;
  }
  
  valeurPorteFeuille(): Promise<void> {
    return new Promise((resolve) => {
      this.PS.getPortefeuille(this.id).subscribe((data) => {
        this.ValeurRestant = data[0]?.valeur;
        console.log("Valeur Restant:", this.ValeurRestant);
        resolve();
      });
    });
  }
  
  calculeValeurAchatEtVente(): Promise<void> {
    return new Promise((resolve) => {
      let valeuractifPosseder: number = 0;

      this.TS.getQuantiteParActifEtTypeTransaction(this.id).subscribe((data) => {
        const requests = data.map((item) => {
          this.actifPosseder.push({
            NomActif:item.actif,
            TotalAcheter: item.total_buy,
            TotalVendu: item.total_sell,
            quantuitePosseder: item.total_buy - item.total_sell,
          });

          return this.service.summary(item.actif).toPromise().then((summaryData: any) => {
            const askPrice = summaryData.data[0]?.quote?.ask ?? 0;
            valeuractifPosseder += askPrice * (item.total_buy - item.total_sell);
            console.log("Valeur Actif Posséder:", valeuractifPosseder);
          });
        });

        Promise.all(requests).then(() => {
          this.valeuractifPosseder = valeuractifPosseder;
          resolve();
        });
      });
    });
  }

  afficherValeurs() {
    console.log("Valeur Restant (dans afficherValeurs):", this.ValeurRestant);
    console.log("Valeur Actif Posséder (dans afficherValeurs):", this.valeuractifPosseder);
    console.log("Valeur Total:", this.valeuractifPosseder+this.ValeurRestant);
    console.log(this.actifPosseder);
  }
}
