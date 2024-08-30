import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PorteFeuilleVirtuelleService } from 'src/services/porte-feuille-virtuelle.service';
import { TransactionsService } from 'src/services/transactions.service';

@Component({
  selector: 'app-acheter-modale',
  templateUrl: './acheter-modale.component.html',
  styleUrls: ['./acheter-modale.component.css']
})
export class AcheterModaleComponent implements OnInit {
  visible: boolean = false;
  orderOptions!: { name: string, code: string }[]; // Corrected type for dropdown options
  formGroup!: FormGroup;
  @Input() ask!: number;
  @Input() symbol!: string;
   currentDate = new Date();
   formattedDate = this.currentDate.toISOString().split('T')[0];
   userID=localStorage.getItem("userId");
   porteFeuille!:any[];


   constructor(private TS: TransactionsService, private router: Router, private activatedroute: ActivatedRoute,private PS:PorteFeuilleVirtuelleService
   ) { }
  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.orderOptions = [
      { name: "Market Buy", code: "MB" },
      { name: "Limit Buy", code: "LB" }
    ];

    this.formGroup = new FormGroup({
      total: new FormControl({ value: null, disabled: true }, [Validators.required]), // Disabled status for readonly
      selectedOrder: new FormControl(null, [Validators.required]),
      selectedWallet:new FormControl(null, [Validators.required]),
      limit: new FormControl(null), // No validation required for now
      shares: new FormControl(null, [Validators.required])
    });

    this.formGroup.get('shares')?.valueChanges.subscribe(() => {
      this.updateTotal();
    });
  
    this.formGroup.get('selectedOrder')?.valueChanges.subscribe(() => {
      this.updateTotal();
    });
    this.formGroup.get('limit')?.valueChanges.subscribe(() => {
      this.updateTotal();
    });
    
    

    // Listen to changes in selectedOrder and reset the 'limit' field if the order type is not 'Limit Buy'
    this.formGroup.get('selectedOrder')?.valueChanges.subscribe(value => {
      if (value?.code !== 'LB') {
        this.formGroup.get('limit')?.reset();
      }
    });
    this.selectPorteFeuille();

    
  }
  updateTotal() {
    const sharesValue = this.formGroup.get('shares')?.value || 0;
    const askPrice = this.ask || 0;
    const selectedOrder = this.formGroup.get('selectedOrder')?.value;
    
    // Check if the order type is 'Limit Buy' and apply the corresponding logic
    if (selectedOrder?.code === 'LB') {
      const limitPrice = this.formGroup.get('limit')?.value || 0;
      this.formGroup.get('total')?.setValue(limitPrice * sharesValue);
    } else {
      this.formGroup.get('total')?.setValue(askPrice * sharesValue);
    }
  }

  

  submitForm(){

    const Data = {
      actif: this.symbol,
      TypeTransaction: this.formGroup.get('selectedOrder')?.value.name,
      quantuite: this.formGroup.get('shares')?.value,
      porteFeuilleID:this.formGroup.get('selectedWallet')?.value,
      date: this.formattedDate,
      prixTotal:this.ask*this.formGroup.get('shares')?.value,
      limitBuy:this.formGroup.get('selectedOrder')?.value.name === 'Market Buy' ? null : true,
      limitBuyPrice:this.formGroup.get('selectedOrder')?.value.name === 'Market Buy' ? null :this.formGroup.get('limit')?.value ,
      userID:localStorage.getItem("userId"),
      buyOrsell:"buy",
      
    };
    console.log(Data);
    this.TS.onSave(Data).subscribe(()=>{
      this.visible=false;
      if(Data.TypeTransaction==="Market Buy"){
        console.log("dahmax");
      this.PS.setValeur(Data.porteFeuilleID,Data.prixTotal).subscribe(()=>{
        
      })
      
      }
    });


  }

  selectPorteFeuille(){
    this.PS.getPortefeuilleUser(this.userID).subscribe((data)=>{
      this.porteFeuille=data;
    })
  }
}
