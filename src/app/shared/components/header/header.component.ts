import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.store';
import { IAuthUser } from '../../models/barrel-models';

import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	sidenavActions;
	sidenavParams;
	currentRoute: string;

	public user: Observable<IAuthUser>; 

  constructor(private store: Store<AppState>) {
  	this.user = this.store.select('auth');
    this.sidenavActions = new EventEmitter<any>();
  }

  ngOnInit() {
  }


  public showSidenav(): void {
      this.sidenavActions.emit('sideNav');
  }

  public closeSideNav() {
    this.sidenavActions.emit({action: 'sideNav'});
  }

}