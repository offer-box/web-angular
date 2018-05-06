import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { ElementCheckBox } from '../../model/element-checkbox';
import { element } from 'protractor';

@Component({
  selector: 'ngbd-accordion-basic',
  templateUrl: 'accordion.component.html'
})
export class NgbdAccordionBasic implements OnInit {
  public cnpj: string;
  public nomeEmpresa: string;
  public porteEmpresa: string;
  public cnpjValido: boolean;
  public apiGet: string = "https://hacka-compras-publicas.herokuapp.com/get_cnpj/";
  public apiTag: string = "http://offer-box.mybluemix.net/api/offer-box/list-tags";
  public apiPost: string = "https://hacka-compras-publicas.herokuapp.com/save_cnpj";
  public tags: ElementCheckBox[];

  elementsCheckBox: ElementCheckBox[];

  constructor(private http: Http) {
    if (this.cnpj == null) {
      this.cnpjValido = false;
    }
  }

  public addTag(description: String) {
    var elementCheckBox = new ElementCheckBox();
    elementCheckBox.description = description;
    elementCheckBox.checked = false;
    this.tags.push(elementCheckBox);
  }

  public ngOnInit(): void {
    this.elementsCheckBox = new Array<ElementCheckBox>();

    this.tags = new Array<ElementCheckBox>();

    this.addTag("madeira");
    this.addTag("metal");
    this.addTag("estofado");
    this.addTag("acento");
    this.addTag("rodas");
    this.addTag("apoio");
    this.addTag("tela");
    this.addTag("gabinete");
    this.addTag("teclado");
    this.addTag("monitor");
    this.addTag("internet");
    this.addTag("fonte");
    this.addTag("CPU");
    this.addTag("Som");
  }

  public verifyCheckBox(value) {
    let checked = value.target.checked;
    let id = value.target.id;

    var contains = false;
    for (let tag of this.elementsCheckBox) {
      if (tag.description == id) {
        contains = true;
        tag.checked = checked;
      }
    }

    if (contains == false) {
      var elementCheckBox = new ElementCheckBox();
      elementCheckBox.description = id;
      elementCheckBox.checked = checked;

      this.elementsCheckBox.push(elementCheckBox);
    }

    console.log(this.elementsCheckBox);

    for (var i = 0; i < this.elementsCheckBox.length; i++) {
      if (this.elementsCheckBox[i].checked == false) {
        this.elementsCheckBox.splice(i, 1);
      }
    }

  }

  submit(cnpj) {
    let url = this.apiGet + cnpj;
    this.http.get(url).subscribe((res) => {
      console.log(res.json())
      this.cnpjValido = true;
      this.nomeEmpresa = res.json().nome
      this.porteEmpresa = res.json().porte
    });

  }
  save() {
    let url = this.apiPost;
    let cnpj = this.cnpj;
    let name_company = this.nomeEmpresa;
    let type_company = this.porteEmpresa;

    for (let item of this.elementsCheckBox) {
      var tags = item;
      var checked = item.checked;
      var description = item.description
    }
    this.http.post(url, { cnpj, name_company, type_company, tags }).subscribe((res) => {
      console.log(res.json())
    });
  }
}
