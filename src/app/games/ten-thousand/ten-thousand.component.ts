import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../../api-variable';
import { AppVariable } from '../../app-variable';
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
    protected snackBar: MatSnackBar,
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
      score: ['', [Validators.required, Validators.pattern(/[0-9]+/), Validators.max(10000), this.validateScore]],
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
   * Removes a player
   *
   * @param {Player} player
   */
  removePlayer(player: Player) {
    this.namedPlayerRepository
      .delete(player)
      .subscribe(() => {
        this.play.players = this.play.players.filter(playPlayer => playPlayer !== player );
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
      stage: this.play.progress
    };

    this.playRepository
      .patch(play)
      .subscribe((play: Play) => {
        this.play = play;
      })
    ;

    this.scoreForm.patchValue({player: this.play.players[0][ApiVariable.OBJECT_ID]});

    this.snackBar.open('Game is started ! Good luck !', null, AppVariable.SNACK_BAR_DEFAULT_OPTIONS);
  }

  /**
   * Finish the play because a player wins
   *
   * @return {void}
   */
  finishPlay() {
    let play = {
      id: this.play.id,
      stage: this.play.ended
    };

    this.playRepository
      .patch(play)
      .subscribe((play: Play) => {
        this.play = play;
      })
    ;
  }

  /**
   * Adds a score
   *
   * @return {void}
   */
  addScore() {
    let scoredTurn = this.scoreForm.value;
    let score = parseInt(scoredTurn['score']);
    // checking for no negative number, above 10000 (form validation normally), but -500 which is nenette
    if ((score <= 0 && score != -500) || (score > 10000)) {
      return;
    }

    scoredTurn['play'] = this.play[ApiVariable.OBJECT_ID];
    scoredTurn['score'] = score;

    let playerId = scoredTurn['player'];
    let player = this.retrievePlayer(playerId);

    // checking the score that must be at least 1000 for the first score of player, except -500 value which is nenette
    if (score != -500 && player.score <= 0 && score < 1000) {
      this.snackBar.open('The first score of a player must be at least 1000.', null, AppVariable.SNACK_BAR_DEFAULT_OPTIONS);

      return;
    }

    this.scoredTurnRepository
      .post(scoredTurn)
      .subscribe((scoredTurn: ScoredTurn) => {
        // let player = this.retrievePlayer(playerId);
        player.turns.push(scoredTurn);
        player.score += scoredTurn.score;

        this.scoreForm.patchValue({score: ''});

        if (player.score == 10000) {
          this.finishPlay();
        }
      })
    ;
  }

  /**
   * Removes a score (scoredTurn)
   *
   * @param {Player}     player
   * @param {ScoredTurn} scoredTurn
   *
   * @return void
   */
  removeScore(player: Player, scoredTurn: ScoredTurn) {
    this.scoredTurnRepository
      .delete(scoredTurn)
      .subscribe(() => {
        player.score = player.score -= scoredTurn.score;
        player.turns = player.turns.filter(playerTurn => playerTurn !== scoredTurn);
      })
    ;
  }

  /**
   * Retrieves a player from its ApiVariable.OBJECT_ID
   *
   * @param  {string} id
   *
   * @return {Player}
   */
  retrievePlayer(id: string): Player {
    for (let player of this.play.players) {
      if (player[ApiVariable.OBJECT_ID] == id) {
        return player;
      }
    }

    return null;
  }

  /**
   * Validation for score
   *
   * @param {FormControl} input
   *
   * @return any|null
   */
  validateScore(input: FormControl) {
    let validScoreValues =  [-500, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450, 3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950, 4000, 4050, 4100, 4150, 4200, 4250, 4300, 4350, 4400, 4450, 4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850, 4900, 4950, 5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450, 5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950, 6000, 6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450, 6500, 6550, 6600, 6650, 6700, 6750, 6800, 6850, 6900, 6950, 7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350, 7400, 7450, 7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950, 8000, 8050, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450, 8500, 8550, 8600, 8650, 8700, 8750, 8800, 8850, 8900, 8950, 9000, 9050, 9100, 9150, 9200, 9250, 9300, 9350, 9400, 9450, 9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850, 9900, 9950, 10000];

    return (validScoreValues.indexOf(parseInt(input.value)) != -1) ? null : {isValidScore: false};
  }
}
