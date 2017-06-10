import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { IDatepicker, ISettings } from '../interfaces';
import { UtilsService } from './utils.service';
import { AuthService } from '../../auth/auth.service';
import { LayoutService } from '../layout/layout.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ServerCommService {

	  private object: FirebaseObjectObservable<any>;

	  private dateObject: IDatepicker;

    constructor(private db: AngularFireDatabase,
                private layout: LayoutService,
                private auth: AuthService,
                private utils: UtilsService) {
      this.dateObject =  this.utils.getCurrentDate();
    }

    updateSalary(salary: number): Observable<any> {
      this.layout.turnOnLoading();

      let returnValue: Observable<any> = Observable.of(null);
      this.auth.uid.subscribe(uid => {
        if (uid) {
          const route =
            `${uid}/${this.dateObject.date.year}/${this.dateObject.date.month}/summary`;
          console.log('route', route);

          this.db
      			.object(route)
      			.update({ currentSalary: salary })
            .then((res) => {
              returnValue = Observable.of(res);
              this.layout.turnOffLoading();
            })
            .catch(error => {
              returnValue = Observable.of(error);
              this.layout.turnOffLoading();
            });
        }
      });





      return returnValue;
  	}

}
