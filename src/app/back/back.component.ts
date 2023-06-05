import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../core/services/delivery.service';
import { ChartDataSets, ChartType  } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent implements OnInit {
  lineChartData: ChartDataSets[]=[];
  lineChartLabels: Label[] =[];
  lineChartColors: Color[] =[];
  lineChartPlugins = [];
  lineChartLegend:boolean=false;
  public lineChartType: ChartType = 'line';
  lineChartOptions:any;
  adresses:string[]=[];
  nbadresses:number[]=[];
  constructor(private _service: DeliveryService) { }


  ngOnInit(): void {
    
    
    
  }
  


  
}
