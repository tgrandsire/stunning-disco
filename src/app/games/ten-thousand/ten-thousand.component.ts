import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Play, Player } from '../model';
import { PlayRepository } from '../repositories/play-repository.service';
import { NamedPlayerRepository } from '../repositories/named-player-repository.service';

@Component({
	selector: 'app-ten-thousand',
	templateUrl: './ten-thousand.component.html',
	styleUrls: ['./ten-thousand.component.scss']
})
export class TenThousandComponent implements OnInit {
	protected play: Play;
	protected players: Player[] = [];
	protected playerForm: FormGroup;
	protected scoreForm: FormGroup;

	constructor(
		protected formBuilder: FormBuilder,
		protected playRepository: PlayRepository,
		protected namedPlayerRepository: NamedPlayerRepository
	) { }

	ngOnInit() {
		this.scoreForm = this.formBuilder.group({
			score: ['', Validators.required]
		});
	}

	newGame() {
		let play = {
			game: '/api/games/5'
		};

		this.playRepository
			.post(play)
			.subscribe(response => {
				this.play = response;
			})
		;

		this.playerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3)]]
		});
	}

	addPlayer() {
		let player = {
			play: this.play['@id']
		};

		player = Object.assign(new Player(), player);
		player = Object.assign(player, this.playerForm.value);

		this.namedPlayerRepository
			.post(player)
			.subscribe(response => {
				this.players.push(response);
				this.playerForm.reset({name: ''});
				this.playerForm.controls['name'].setErrors(null);
			})
		;
	}

	addScore() {
		//
	}
}
