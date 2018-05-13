import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../../api-variable';
import { Play, Player, ScoredTurn, NamedPlayer } from '../model';
import { PlayRepository } from '../repositories/play-repository.service';
import { NamedPlayerRepository } from '../repositories/named-player-repository.service';
import { ScoredTurnRepository } from '../repositories/scored-turn-repository.service';

@Component({
	selector: 'app-ten-thousand',
	templateUrl: './ten-thousand.component.html',
	styleUrls: ['./ten-thousand.component.scss']
})
export class TenThousandComponent implements OnInit {
	protected play: Play;
	protected playerForm: FormGroup;
	protected scoreForm: FormGroup;

	/**
	 * Constructor
	 *
	 * @param {FormBuilder}           formBuilder
	 * @param {PlayRepository}        playRepository
	 * @param {NamedPlayerRepository} namedPlayerRepository
	 * @param {ScoredTurnRepository}  scoredTurnRepository
	 */
	constructor(
		protected formBuilder: FormBuilder,
		protected playRepository: PlayRepository,
		protected namedPlayerRepository: NamedPlayerRepository,
		protected scoredTurnRepository: ScoredTurnRepository
	) { }

	/**
	 * {@inheritdoc}
	 */
	ngOnInit() {
		this.scoreForm = this.formBuilder.group({
			score: ['', [Validators.required, Validators.pattern(/[0-9]+/), Validators.max(10000), this.validateScoreDivisibleBy50]],
			player: [null, Validators.required]
		});
	}

	/**
	 * Creates a new Game (Play)
	 *
	 * @return {void}
	 */
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

	/**
	 * Adds a player
	 *
	 * @return {void}
	 */
	addPlayer() {
		let player = {
			play: this.play[ApiVariable.OBJECT_ID]
		};

		player = Object.assign(new Player(), player);
		player = Object.assign(player, this.playerForm.value);

		this.namedPlayerRepository
			.post(player)
			.subscribe((player: Player) => {
				this.play.players.push(<Player>player);
				this.playerForm.reset({name: ''});
				this.playerForm.controls['name'].setErrors(null);

				this.playerForm.controls['name'].markAsPristine();
				this.playerForm.controls['name'].markAsUntouched();
				this.playerForm.updateValueAndValidity();
			})
		;
	}

	/**
	 * Starts the play
	 *
	 * @return {void}
	 */
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

		this.scoreForm.patchValue({player: this.play.players[0][ApiVariable.OBJECT_ID]});
	}

	/**
	 * Validation for score
	 *
	 * @param {FormControl} input
	 *
	 * @return any|null
	 */
	validateScoreDivisibleBy50(input: FormControl) {
		const isDivisibleBy50 = parseInt(input.value)%50 == 0;

		return isDivisibleBy50 ? null : { isDivisibleBy50: false };
	}

	/**
	 * Adds a score
	 *
	 * @return {void}
	 */
	addScore() {
		let scoredTurn = this.scoreForm.value;
		scoredTurn['score'] = parseInt(scoredTurn['score']);

		let playerId = scoredTurn['player'];

		this.scoredTurnRepository
			.post(scoredTurn)
			.subscribe((scoredTurn: ScoredTurn) => {
				let player = this.retrievePlayer(playerId);
				player.turns.push(scoredTurn);
				player.score += scoredTurn.score;
			})
		;
	}

	retrievePlayer(id: string): Player {
		for (let player of this.play.players) {
			if (player[ApiVariable.OBJECT_ID] == id) {
				return player;
			}
		}

		return null;
	}

}
