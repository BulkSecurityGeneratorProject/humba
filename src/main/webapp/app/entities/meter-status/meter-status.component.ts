import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMeterStatus } from 'app/shared/model/meter-status.model';
import { Principal } from 'app/core';
import { MeterStatusService } from './meter-status.service';

@Component({
    selector: 'jhi-meter-status',
    templateUrl: './meter-status.component.html'
})
export class MeterStatusComponent implements OnInit, OnDestroy {
    meterStatuses: IMeterStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private meterStatusService: MeterStatusService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.meterStatusService.query().subscribe(
            (res: HttpResponse<IMeterStatus[]>) => {
                this.meterStatuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMeterStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMeterStatus) {
        return item.id;
    }

    registerChangeInMeterStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('meterStatusListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
