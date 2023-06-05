import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Delivery } from 'src/app/core/models/delivery.model';
import { Orders } from 'src/app/core/models/orders.model';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { formatDate } from '@angular/common';
import * as L from "leaflet";
import { Layer, marker } from 'leaflet';
@Component({
  selector: 'app-order-list-delivery',
  templateUrl: './order-list-delivery.component.html',
  styleUrls: ['./order-list-delivery.component.css']
})
export class OrderListDeliveryComponent implements OnInit {



  dataa: Subscription = new Subscription;


  order!: Orders;
  ordersList: any;
  deliveriesList: any;
  markers: Layer[] = [];
  interval: any;
  map: any;
  homeCoords = {
    lat: 33.8869,
    lon: 9.5375
  };
  popupText = "Some popup text";
  markerGroup: any;
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
  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    // Retrieve all deliveries
    this.deliveryService.displayDelivery().subscribe(
      deliveriesList => {
        this.deliveriesList = deliveriesList;



        // Retrieve all orders
        this.deliveryService.retrieveAllOrders().subscribe(
          ordersList => {
            this.ordersList = ordersList;


            this.ordersList.forEach((order: Orders) => {

              this.deliveriesList.forEach((delivery: Delivery) => {
                if (
                  order.delivery &&
                  order.delivery.idDelivery === delivery.idDelivery
                ) {
                  if (!delivery.ordersList) {
                    delivery.ordersList = [];
                  }
                  this.deliveryService.getAddressCoordinate(order.shippingAdresse).subscribe(coordinates => {
                    console.log('Latitude:', coordinates[0]);
                    console.log('Longitude:', coordinates[1]);
                    this.addMarker(coordinates[0], coordinates[1], "Shipping adresse " + order.idOrders + " " + delivery.statusType);
                  });
                  delivery.ordersList.push(order);
                }
              });
            });

            console.log(this.deliveriesList);

          }
        );

      }
    );
  }
  getOrdredList() {
    this.emptymarkers();
    this.deliveryService.displayDelivery().subscribe(
      deliveriesList => {
        this.deliveriesList = deliveriesList;
        this.deliveriesList.forEach((d: Delivery) => {
          this.deliveryService.getPath(d.idDelivery).subscribe((data) => {
            data.forEach((o: Orders, i: number) => {
              if (!d.ordersList) {
                d.ordersList = [];
              }
              this.deliveryService.getAddressCoordinate(o.shippingAdresse).subscribe(coordinates => {
                console.log('Latitude:', coordinates[0]);
                console.log('Longitude:', coordinates[1]);
                this.addMarker(coordinates[0], coordinates[1], "Shipping adresse " + i + 1 + " " + d.statusType);
              });
              d.ordersList.push(o);
            })
          })
        })
      });

  }
  cancelOrder(id: number) {
    this.deliveryService.cancelDelivery(id).subscribe((data) => {
      this.deliveryService.displayDelivery().subscribe(
        deliveriesList => {
          this.deliveriesList = deliveriesList;



          // Retrieve all orders
          this.deliveryService.retrieveAllOrders().subscribe(
            ordersList => {
              this.ordersList = ordersList;


              this.ordersList.forEach((order: Orders) => {

                this.deliveriesList.forEach((delivery: Delivery) => {
                  if (
                    order.delivery &&
                    order.delivery.idDelivery === delivery.idDelivery
                  ) {
                    if (!delivery.ordersList) {
                      delivery.ordersList = [];
                    }
                    this.deliveryService.getAddressCoordinate(order.shippingAdresse).subscribe(coordinates => {
                      console.log('Latitude:', coordinates[0]);
                      console.log('Longitude:', coordinates[1]);
                      this.addMarker(coordinates[0], coordinates[1], "Shipping adresse " + order.idOrders + " " + delivery.statusType);
                    });
                    delivery.ordersList.push(order);
                  }
                });
              });

              console.log(this.deliveriesList);

            }
          );

        }
      );
    })
  }
  finishShipment(idDelivery: number): void {
    const endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const status = 'Succeeded';

    this.deliveryService.finishingDelivery(idDelivery, status, endDate).subscribe(
      (delivery) => {
        this.deliveryService.displayDelivery().subscribe(
          deliveriesList => {
            this.deliveriesList = deliveriesList;



            // Retrieve all orders
            this.deliveryService.retrieveAllOrders().subscribe(
              ordersList => {
                this.ordersList = ordersList;


                this.ordersList.forEach((order: Orders) => {

                  this.deliveriesList.forEach((delivery: Delivery) => {
                    if (
                      order.delivery &&
                      order.delivery.idDelivery === delivery.idDelivery
                    ) {
                      if (!delivery.ordersList) {
                        delivery.ordersList = [];
                      }
                      this.deliveryService.getAddressCoordinate(order.shippingAdresse).subscribe(coordinates => {
                        console.log('Latitude:', coordinates[0]);
                        console.log('Longitude:', coordinates[1]);
                        this.addMarker(coordinates[0], coordinates[1], "Shipping adresse " + order.idOrders + " " + delivery.statusType);
                      });
                      delivery.ordersList.push(order);
                    }
                  });
                });

                console.log(this.deliveriesList);

              }
            );

          }
        );
      },
      (error) => {
        console.error('Error updating delivery status:', error);
      }
    );
  }
  addMarker(latitude: number, longitude: number, test: string) {
    const popupInfo = `<b style="color: blue; background-color: white">${test
      }</b>`;


    this.markers.push(
      marker(
        [latitude, longitude],
        this.markerIcon
      ).bindPopup(popupInfo)
    );

  }
  emptymarkers() {
    this.markers = [];
  }
  onMapReady(map: L.Map) {
    this.map = map;

  }


}
