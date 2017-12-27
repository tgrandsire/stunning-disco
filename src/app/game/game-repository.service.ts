import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameRepository {
	url: string = 'http://local.grandsire.org/app_dev.php/games';

	constructor(private authHttp: AuthHttp) {}

	getList() {
		return this.authHttp
			.get(this.url)
			.map((data: Response) => data.json())
			.map((data: Observable<any>) => data["hydra:member"]);
	}

	count() {
		return this.authHttp
			.get(this.url)
			.map((data: Response) => data.json())
			.map((data: Observable<any>) => data["hydra:totalItems"]);
	}
}
