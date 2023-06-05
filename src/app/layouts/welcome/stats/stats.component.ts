import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { currentUser } from 'src/app/core/models/currentUser';
import { ProductService } from 'src/app/core/services/product.service';
import { DetailedOrders } from 'src/app/core/models/detailedOrders';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  template:`
   <div style="display: block;">
      <canvas
        baseChart
        [datasets]="lineChartData"
        [labels]="lineChartLabels"
        [options]="lineChartOptions"
        [colors]="lineChartColors"
        [legend]="lineChartLegend"
        [chartType]="lineChartType"
        [plugins]="lineChartPlugins"
      ></canvas>
    </div>
  `,
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  currentUser?: currentUser;
  chartOptions: any;
  public orders: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8083/ratatoskr/product/order/get/2023-01-01/2023-05-31/2').subscribe((data: any[]) => {
      this.orders = data;
      console.log(this.orders);
    });
    }
  }

