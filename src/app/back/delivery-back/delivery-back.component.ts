import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ChartDataSets, ChartType  } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-delivery-back',
  templateUrl: './delivery-back.component.html',
  styleUrls: ['./delivery-back.component.css']
})
export class DeliveryBackComponent implements OnInit {
  deliverys:any;
  searchText = '';
  lineChartData: ChartDataSets[]=[];
  lineChartLabels: Label[] =[];
  lineChartColors: Color[] =[];
  lineChartPlugins = [];
  lineChartLegend:boolean=false;
  public lineChartType: ChartType = 'bar';
  lineChartOptions:any;
  adresses:string[]=[];
  nbadresses:number[]=[];
  constructor(private service:DeliveryService) { }
  
  ngOnInit(): void {
    this.service.displayDelivery().subscribe((data)=>{
      this.deliverys=data;
      console.log(data);
    });
    this.service.retrieveAllOrders().subscribe(res => {
      res.forEach(o => {
        if (!this.adresses.includes(o.shippingAdresse)) {
          this.adresses.push(o.shippingAdresse);
        }
      });
    });
    
    this.service.retrieveAllOrders().subscribe(res => {
      let addressCounts:any = {};

      res.forEach(order => {
        let address = order.shippingAdresse;
        if (addressCounts[address]) {
          addressCounts[address]++;
        } else {
          addressCounts[address] = 1;
        }
        
        
      });
      console.log(Object.values(addressCounts))
        this.nbadresses=Object.values(addressCounts);
        this.lineChartData = [
          { 
            data: this.nbadresses, label: 'Number of deliveries per location' 
          },
        ];
        this.lineChartLabels = this.adresses;
       
        this.lineChartOptions = {
          responsive: true,
        };
       
        this.lineChartColors= [
          {
            borderColor: 'black',
            backgroundColor: 'rgba(51, 122, 255)',
          },
        ];
       
        this.lineChartLegend = true;
        this.lineChartPlugins = [];
      
    });
    console.log(this.nbadresses)
    console.log(this.adresses)
  }
  exportToPdf() {

    const data = document.getElementById('delivery-table')!;
  html2canvas(data).then(canvas => {
    const imgWidth = 208;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('deliveries.pdf');
  });
  }
  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.querySelector('#tableExample3 table'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Deliveries');
    XLSX.writeFile(wb, 'deliveries.xlsx');
  }

}
