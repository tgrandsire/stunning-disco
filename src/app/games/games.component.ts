import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../api-variable';

import { GameRepository } from './repositories/game-repository.service';
import { Game } from './model';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public count: number;
  public games: Game[];

  constructor(private gameRepository: GameRepository) {}

  ngOnInit() {
    this.gameRepository.cget()
      .subscribe(games => {
        this.games = games;
      })
    ;
    this.gameRepository.count()
      .subscribe(count => {
        this.count = count;
      })
    ;
  }
}
