import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceApiService } from 'src/services/finance-api.service';
import { PorteFeuilleVirtuelleService } from 'src/services/porte-feuille-virtuelle.service';
import { TransactionsService } from 'src/services/transactions.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent implements OnInit {
  title = 'ngFinance';
  searchResults: any[] = [];
  keyword: string = '';

  date$: any[] = [];
  lineData$: any[] = [];
  barData$: any[] = [];
  lineCount!: number;
  price!: number;
  volume!: number;
  ask!: number;
  bid!: number;
  open!: number;
  previousclose!: number;
  userId!: any;
  userName!: any;
  prenom!: any;
  symbol!: string;

  dataAvailable: boolean = false;
  hasInput: boolean = false;  // New variable to control the display of the button

  ngOnInit() {
    this.userName = localStorage.getItem("userName");
    this.userId = localStorage.getItem("userId");
    this.prenom = localStorage.getItem("prenom");
    console.log(this.userName);
    console.log(this.userId);
    console.log(this.prenom);
    this.TS.getLimitBuy(this.userId).subscribe((data: any) => {
      for (const item of data) {
        console.log(item);
        this.service.summary(item.actif).subscribe((data: any) => {
          if (item.limitBuyPrice >= data.data[0].quote.ask) {
            this.TS.setLimitBuy(item.id).subscribe(() => {
              this.PS.setValeur(item.porteFeuilleID, item.limitBuyPrice).subscribe(() => {});
            });
          }
        });
      }
    });
  }

  public chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  public chartLabels: string[] = [];
  public chartLegend = true;
  public chartData: any[] = [
    { data: [], label: 'Price', yAxisID: 'right-y-axis', type: 'line' },
    { data: [], label: 'Volume', yAxisID: 'left-y-axis' }
  ];
  timeframes = [
    { id: 0, timeframe: 0, label: '1 Day' },
    { id: 1, timeframe: 4, label: '1 Week' },
    { id: 2, timeframe: 20, label: '1 Month' },
    { id: 3, timeframe: 62, label: '3 Months' },
    { id: 4, timeframe: 125, label: '6 Months' },
    { id: 5, timeframe: 251, label: '1 Year' },
    { id: 6, timeframe: 1288, label: '5 Years' },
    { id: 7, timeframe: undefined, label: 'Max' }
  ];

  constructor(
    private service: FinanceApiService,
    private TS: TransactionsService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private PS: PorteFeuilleVirtuelleService,
  ) {}

  onKeyup(event: KeyboardEvent) {
    const key = event.key;
    if (key && key.length === 1) {
      this.keyword += key;
      this.hasInput = this.keyword.length > 0; // Update hasInput when typing
      this.service.searchYahoo(this.keyword).subscribe(
        (data: any) => {
          if (Array.isArray(data["data"])) {
            this.searchResults = data["data"].map((item: any) => ({
              symbol: item.symbol,
              name: item.shortname
            }));
          } else {
            console.warn('Données des correspondances non disponibles ou au mauvais format');
            this.searchResults = [];
          }
          console.log(data);
        },
        (error) => {
          console.error('Erreur lors de la recherche', error);
        }
      );
    }
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.symbol = input.value;

    this.service.daily(this.symbol).subscribe((data: any) => {
      this.date$ = Object.keys(data['Time Series (Daily)']).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      const dailyData = this.date$.map(date => data['Time Series (Daily)'][date]);
      this.lineData$ = dailyData.map(day => parseFloat(day['4. close']));
      this.barData$ = dailyData.map(day => parseInt(day['5. volume'], 10));
      this.chartLabels = this.date$;
      this.chartData[0].data = this.lineData$;
      this.chartData[1].data = this.barData$;
      this.lineCount = this.lineData$.length - 1;
      this.timeframes[7] = { id: 7, timeframe: this.lineCount, label: 'Max' };
    });

    this.service.summary(this.symbol).subscribe((data: any) => {
      console.log(data.data[0].quote);
      this.price = data.data[0].quote.regularMarketPrice;
      this.volume = data.data[0].quote.regularMarketVolume;
      this.ask = data.data[0].quote.ask;
      this.bid = data.data[0].quote.bid;
      this.open = data.data[0].quote.regularMarketPrice;
      this.previousclose = data.data[0].quote.regularMarketPreviousClose;
      this.dataAvailable = true;
    });
  }

  onTimeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const timeframe = parseInt(target.value, 10);

    if (isNaN(timeframe) || timeframe < 0 || timeframe > this.lineCount) {
      console.warn('Invalid timeframe value:', timeframe);
      return;
    }

    const endIndex = this.lineCount - timeframe;
    const startIndex = Math.max(0, endIndex);
    const dates = this.date$.slice(startIndex, this.lineCount + 1);
    const line = this.lineData$.slice(startIndex, this.lineCount + 1);
    const bar = this.barData$.slice(startIndex, this.lineCount + 1);

    console.log(dates);
    console.log(line);
    console.log(bar);

    this.chartLabels = dates;
    this.chartData[0].data = line;
    this.chartData[1].data = bar;
  }
}
