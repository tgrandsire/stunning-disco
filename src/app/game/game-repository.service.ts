import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameRepository {

	constructor(private authHttp: AuthHttp) {}

	getList() {
	let url = 'http://local.grandsire.org/app_dev.php/games';

	return this.authHttp
		.get(url)
		.map((data: Response) => data.json())
		.map((data: Observable<any>) => data["hydra:member"]);
	}
}
