import { Thing } from '../../shared/model/thing';
import { Play, Gamer } from './';

export class Player extends Thing {
  gamer: Gamer;
  play: Play;
}
