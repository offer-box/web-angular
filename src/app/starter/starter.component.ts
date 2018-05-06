import { Component, AfterViewInit } from '@angular/core';
@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
	user: string;

	constructor() {
		this.user = "Augusto Bondança";
	}

	ngAfterViewInit() { }
}