import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GameRepository } from './game-repository.service';
import { Game } from './model';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
    protected count: Observable<number>;
    protected games: Observable<Game[]>;
    protected error: string = '';

    constructor(private gameRepository: GameRepository) {}

    ngOnInit() {
        this.games = this.gameRepository.getList();
        this.count = this.gameRepository.count();
    }
}
