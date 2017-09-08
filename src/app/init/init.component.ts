import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IMission, AppState, IUser, ParentComponent } from '../shared/models/barrel-models';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent extends ParentComponent implements OnInit {

	public userMissions: IMission[];

  constructor(private store: Store<AppState>, private router: Router) {
    super();
  	this.userMissions = [];
  }

  ngOnInit() {
  	this.store.select('user')
      .filter(user => user != null)
  		.subscribe((user: IUser) => this.userMissions = user.userMissions);
  }

  goToMissions(): void {
    this.router.navigate([this.routes_constants.viewMissions.path])
  }

}
