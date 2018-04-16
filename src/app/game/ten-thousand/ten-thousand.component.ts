import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Play, Player } from '../model';

@Component({
	selector: 'app-ten-thousand',
	templateUrl: './ten-thousand.component.html',
	styleUrls: ['./ten-thousand.component.scss']
})
export class TenThousandComponent implements OnInit {
	protected play$: Observable<Play>;
	protected players$: Observable<Player[]>;

	constructor() { }

	ngOnInit() {

	}
}
