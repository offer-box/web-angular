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
  public offer: Offer;

  public apiGet: string = "https://hacka-compras-publicas.herokuapp.com/list_bidding_by_product/all";

  constructor(private http: Http, private modalService: NgbModal) {
    this.biddings = new Array<Bidding>();
    var bidding = new Bidding();

    // bidding.product = "cadeira";

    // this.biddings.push(bidding);

    let url = this.apiGet;

    this.http.get(url).subscribe((res) => {
      // console.log(res.json())
      this.biddings = res.json();
      
    });
  }

  open2(content, _id) { 

    this.getGeolocation();

    for(let bidding of this.biddings) {
      if(bidding._id == _id) {
        this.biddingSelected = bidding;
        this.offer.id_bidding = String(bidding._id);
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

  public save() {
    let url = "https://hacka-compras-publicas.herokuapp.com/save_offer";

    this.http.post(url, this.offer).subscribe((res) => {
      console.log(res.json())
    });
  }

  ngOnInit() { 
    this.offer = new Offer();
    this.offer.id_company = "05834991000121";
  }
 
  public getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    }
  } 

  public showPosition(position){    
    this.offer.lat = String(position.coords.latitude);
    this.offer.lng = String(position.coords.longitude);
  }
}



