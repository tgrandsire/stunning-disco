import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../../api-variable';
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
			.subscribe((play: Play) => {
				this.play = play;
			})
		;

		this.playerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3)]]
		});
	}

	addPlayer() {
		let player = {
			play: this.play[ApiVariable.OBJECT_ID]
		};

		player = Object.assign(new Player(), player);
		player = Object.assign(player, this.playerForm.value);

		this.namedPlayerRepository
			.post(player)
			.subscribe(player => {
				this.play.players.push(player);
				this.playerForm.reset({name: ''});
				this.playerForm.controls['name'].setErrors(null);

				this.playerForm.controls['name'].markAsPristine();
        this.playerForm.controls['name'].markAsUntouched();
        this.playerForm.updateValueAndValidity();
			})
		;
	}

	startPlay() {
		let play = {
			id: this.play.id,
			stage: 1
		};

		this.playRepository
			.patch(play)
			.subscribe((play: Play) => {
				this.play = play;
			})
		;
	}

	addScore() {
		//
	}
}
