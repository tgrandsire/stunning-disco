import { Thing } from '../../../shared/model/thing';

import { Play } from '../play';
import { Player } from '../player/player';

export class Turn extends Thing {
	play: Play;
	player: Player;
}
