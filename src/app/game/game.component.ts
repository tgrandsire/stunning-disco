import { Component, OnInit } from '@angular/core';

import { GameRepository } from './game-repository.service';
import { Game } from './model';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
    count: number = 0;
    games: Game[] = [];
    error: string = '';

    constructor(private gameRepository: GameRepository) {}

    ngOnInit() {
        this.gameRepository
            .getList()
            .subscribe(
                data => this.games = data,
                error => this.error = error.message
            );

        this.gameRepository
            .count()
            .subscribe(
                data => this.count = data,
                error => this.error += error.message
            );
    }
}
