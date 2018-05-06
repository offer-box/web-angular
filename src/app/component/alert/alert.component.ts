import { Input, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { Bidding } from './bidding';
@Component({
  selector: '',
  templateUrl: 'alert.component.html'
})

export class NgbdAlertBasic {
  public biddings: Bidding[];

  constructor() {
    this.biddings = new Array<Bidding>();

    var bidding = new Bidding();

    bidding.product = "cadeira";

    this.biddings.push(bidding);

    console.log(this.biddings);

  }


  ngOnInit() { }

}



