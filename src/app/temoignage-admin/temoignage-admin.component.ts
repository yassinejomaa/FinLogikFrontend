import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { TemoignageService } from 'src/services/temoignage.service';

@Component({
  selector: 'app-temoignage-admin',
  templateUrl: './temoignage-admin.component.html',
  styleUrls: ['./temoignage-admin.component.css']
})
export class TemoignageAdminComponent implements OnInit{
  temoignages!:any[]
  statuses!: any[];

  loading: boolean = true;
ngOnInit(): void {
  if (!localStorage.getItem('userName')) {
    this.router.navigate(['login']);
  }
  this.getAll();
}
constructor(private TS:TemoignageService,private router:Router){

}
getAll(){
  this.TS.getAlltemoi().subscribe((r)=>{
    this.temoignages=r;
    this.loading=false;

  })
}
clear(table: Table) {
  table.clear();
}
accepte(id:number){
  this.TS.accepteTemoi(id).subscribe(()=>{
    this.router.navigate(["formateurs"]);


  })
}
refus(id:number){
  this.TS.refuserTemoi(id).subscribe(()=>{
    this.router.navigate(['formateurs']);


  })
}
dele(id:number){
  this.TS.deleteTemoi(id).subscribe(()=>{
    this.router.navigate(['formateurs']);


  })
}

}
