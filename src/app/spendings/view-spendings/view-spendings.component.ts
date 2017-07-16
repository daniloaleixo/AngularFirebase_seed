import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../shared/singletons/layout.service';
import { ServerCommService } from '../../shared/services/server-comm.service';
import { CurrentMonthService } from '../../shared/singletons/current-month.service';
import { ISummary } from '../../shared/models/summaries.model';

@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.scss']
})
export class ViewSpendingsComponent implements OnInit {

  summary: ISummary;
  hasLeft: number;

	constructor(private layout: LayoutService,
              private currentMonthService: CurrentMonthService,
				      private server: ServerCommService) {
		this.layout.turnOnTabs();
    this.summary = {};
    this.currentMonthService.currentSummary
    .subscribe((summary: ISummary) => {
	this.summary = summary;
	if (this.summary) {
	  this.hasLeft = this.summary.currentSalary;
	  if (this.summary.totalDebit) this.hasLeft -= this.summary.totalDebit;
	  if (this.summary.totalCredit) this.hasLeft -= this.summary.totalCredit;
	}
    });
	}

	ngOnInit() {
	}

}
