import { Component, OnInit } from '@angular/core';

import { TenThousandRepository } from './ten-thousand-repository.service';
import { Play, Player } from '../model';

@Component({
	selector: 'app-ten-thousand',
	templateUrl: './ten-thousand.component.html',
	styleUrls: ['./ten-thousand.component.css']
})
export class TenThousandComponent implements OnInit {
	play: Play;
	players: Player[] = [];

	constructor() { }

	ngOnInit() {

	}

	createPlay => () {
		this.play = new Play();
	}
}
