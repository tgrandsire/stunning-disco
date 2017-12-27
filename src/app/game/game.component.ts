import { Component, OnInit } from '@angular/core';

import { GameRepository } from './game-repository.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
    games: any[] = [];
    error: string = '';

    constructor(private gameRepository: GameRepository) {}

    ngOnInit() {
        this.gameRepository
            .getList()
            .subscribe(
                data => this.games = data,
                error => this.error = error.message
            );
    }
}
