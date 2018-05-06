import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { Bidding } from './bidding';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Offer } from './offer';

@Component({
  selector: '',
  templateUrl: 'alert.component.html',
  encapsulation: ViewEncapsulation.None,
	styles: [`
    .dark-modal .modal-content {
      background-color: #009efb;
      color: white;
    }
    .dark-modal .close {
      color: white;   
    }
  `]
})

export class NgbdAlertBasic {
  public biddings: Bidding[];

  closeResult: string;
  biddingSelected: Bidding;
  offer: Offer;

  public apiGet: string = "https://hacka-compras-publicas.herokuapp.com/list_bidding_by_product/all";

  constructor(private http: Http, private modalService: NgbModal) {
    this.biddings = new Array<Bidding>();
    var bidding = new Bidding();

    // bidding.product = "cadeira";

    // this.biddings.push(bidding);

    let url = this.apiGet;

    this.http.get(url).subscribe((res) => {
      console.log(res.json())
      this.biddings = res.json();
      
    });


  }


  open2(content, _id) { 

    for(let bidding of this.biddings) {
      if(bidding._id == _id) {
        this.biddingSelected = bidding;
      }
    }


    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() { 

    this.offer = new Offer();
    this.offer.lat = "";
    this.getGeolocation();

  }

  public getGeolocation() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }
 
  public showPosition(position) {
    this.offer = new Offer();
    console.log(position.coords.latitude);
    this.offer.lat = String(position.coords.latitude);
    this.offer.lng = String(position.coords.longitude);
  }

}



