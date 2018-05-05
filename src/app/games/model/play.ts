import { Thing } from '../../shared/model/thing';
import { Game, Player } from './';

export class Play extends Thing {
	public readonly setting  = 0;
	public readonly progress = 1;
	public readonly ended    = 2;

	public game: Game;
	public players: Player[] = [];
	public stage: number;

	public get isStarted(): boolean {
		return this.stage > this.setting;
	}

	public get isInProgress(): boolean {
		return this.stage == this.progress;
	}

	public get isEnded(): boolean {
		return this.stage >= this.ended;
	}
}
