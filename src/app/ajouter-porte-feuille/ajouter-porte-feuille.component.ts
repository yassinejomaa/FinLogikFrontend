import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PorteFeuilleVirtuelleService } from 'src/services/porte-feuille-virtuelle.service';

@Component({
  selector: 'app-ajouter-porte-feuille',
  templateUrl: './ajouter-porte-feuille.component.html',
  styleUrls: ['./ajouter-porte-feuille.component.css']
})
export class AjouterPorteFeuilleComponent implements OnInit {

  visible: boolean = false;
  formGroup!: FormGroup;
  userID=localStorage.getItem("userId");
  constructor(
    
    private PS: PorteFeuilleVirtuelleService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nom: new FormControl(null, [Validators.required]), 
    });
  }
    showDialog() {
        this.visible = true;
    }
    ajouter(){
      const Data = {
        nom: this.formGroup.get('nom')?.value,
        valeur: 50000,
        userID:this.userID 
      };
      this.PS.onSave(Data).subscribe(()=>{
        this.visible = false;
      })
    }
}
