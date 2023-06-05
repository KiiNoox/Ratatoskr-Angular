import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Orders } from 'src/app/core/models/orders.model';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import * as L from "leaflet";
import { Layer,  marker} from 'leaflet';
@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  param:string="";
  markers:Layer[]=[];
  interval: any;
  map:any;
  homeCoords = {
    lat: 33.8869,
    lon: 9.5375
  };
  popupText = "Some popup text";
  markerGroup:any;
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };

  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: ""
      })
    ],
    zoom: 5,
    center: L.latLng(this.homeCoords.lat, this.homeCoords.lon)
  };


  orders!:any;
  order!:any;
  constructor(private deliveryService:DeliveryService,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.param=params['id'];
    })
   }

   ngOnInit(): void {
    this.ordersList();
    console.log(this.order)
    
    
  }

  ordersList() {
    this.deliveryService.retrieveAllOrders().subscribe((data) => {
      this.orders = data;
      this.order= this.orders.find((p: Orders) => { return p.idOrders.toString() === this.param });
      this.deliveryService.getAddressCoordinate(this.order.shippingAdresse).subscribe(coordinates => {
        console.log('Latitude:', coordinates[0]);
        console.log('Longitude:', coordinates[1]);
        this.addMarker(coordinates[0],coordinates[1],"Shipping adresse");
      });
      console.log("order:")
      console.log(this.order)
      this.deliveryService.getAddressCoordinate(this.order.delivery.deliveredBy.adress).subscribe(coordinates => {
        console.log('Latitude:', coordinates[0]);
        console.log('Longitude:', coordinates[1]);
        this.addMarker(coordinates[0],coordinates[1],"Delivery");
      });
      console.log(this.order)
    })
  }
  addMarker(latitude: number, longitude: number,test:string) {
    const popupInfo = `<b style="color: blue; background-color: white">${
      test
    }</b>`;

   
      this.markers.push(
          marker(
          [latitude, longitude], 
          this.markerIcon
          ).bindPopup(popupInfo)
        );
      
  }
  emptymarkers(){
    this.markers=[];
  }
  onMapReady(map: L.Map) {
    this.map = map;
    
  }
  
  

  

}
