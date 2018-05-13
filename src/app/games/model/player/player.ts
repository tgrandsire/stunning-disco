import { Thing } from '../../../shared/model/thing';
import { Play } from '../';
import { Turn } from '../turn/turn';

export class Player extends Thing {
  public play: Play;
  public turns: Turn[] = [];
  public score: number = 0;
}
