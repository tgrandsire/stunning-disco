import { Injectable } from '@angular/core';

import { ApiVariable } from '../../api-variable';

import { RepositoryService } from '../../shared/repositories/repository-service';
import { Play } from '../model';

@Injectable()
export class PlayRepository extends RepositoryService {
  protected readonly url: string = ApiVariable.BASE + '/plays';

  protected transformResource(resource: any): Play {
    return Object.assign(new Play(), resource);
  }
}
