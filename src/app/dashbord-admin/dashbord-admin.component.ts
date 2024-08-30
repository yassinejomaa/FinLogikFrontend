import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataset, ChartOptions } from 'chart.js';
import { TemoignageService } from 'src/services/temoignage.service';
import { TransactionsService } from 'src/services/transactions.service';
import { UserService } from 'src/services/user.service';
import { forkJoin } from 'rxjs';  // Importer forkJoin

@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css']
})
export class DashbordAdminComponent implements OnInit {
  nbreUser: number = 0;
  nbreFormation: number = 0;
  MarketBuy: number = 0;
  LimitBuy: number = 0;
  nbreTemoi: number = 0;
  nbreTemoiActif: number = 0;
  nbreTemoiInActif: number = 0;
  nbreT: number = 0;
  chartLabels1: string[] = ["Actif", "Non actif"];
  chartOptions: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Répartition des témoignages actifs et inactifs'
      }
    }
  };
  chartData1: ChartDataset[] = [
    {
      label: "",
      data: []
    }
  ];
  chartData: ChartDataset[] = [
    {
      label: "",
      data: []
    }
  ];
  chartLabels: string[] = ['Market Buy', 'Limit Buy'];

  chartOptionsbar: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Répartition des transactions'
      }
    }
  };

  constructor(
    private TS: TemoignageService,
    private US: UserService,
    private TRS: TransactionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNumberTemoi();
    this.getNumberTemoiActif();
    this.getNumberTemoiInActif();
    this.getNumberUser();
    this.loadBarGraphData();
    this.getNumberT()
  }

  getNumberTemoi() {
    this.TS.getNumberTemoi().subscribe((r) => {
      this.nbreTemoi = r;
    });
  }
  getNumberT() {
    this.TRS.nbreTransaction().subscribe((r) => {
      this.nbreT = r;
    });
  }

  getNumberTemoiActif() {
    this.TS.getNumberTemoiActive().subscribe((r) => {
      this.nbreTemoiActif = r;
      this.updateChartDataPie();
    });
  }

  getNumberTemoiInActif() {
    this.TS.getNumberTemoiInActive().subscribe((r) => {
      this.nbreTemoiInActif = r;
      this.updateChartDataPie();
    });
  }

  getNumberUser() {
    this.US.getNbreUser().subscribe((r) => {
      this.nbreUser = r;
    });
  }

  updateChartDataPie() {
    this.chartData1 = [
      {
        label: "",
        data: [this.nbreTemoiActif, this.nbreTemoiInActif]
      }
    ];
  }

  loadBarGraphData() {
    // Utilisation de forkJoin pour attendre que les deux requêtes soient terminées
    forkJoin({
      limitBuy: this.TRS.nbreTransactionLimitBuy(),
      marketBuy: this.TRS.nbreTransactionMarketBuy()
    }).subscribe(({ limitBuy, marketBuy }) => {
      this.LimitBuy = limitBuy;
      this.MarketBuy = marketBuy;

      // Mise à jour des données du graphique une fois les valeurs reçues
      this.chartData = [{
        label: 'Nombre de Transactions',
        data: [this.LimitBuy, this.MarketBuy]
      }];
    });
  }
}
