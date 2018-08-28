import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMeterModel } from 'app/shared/model/meter-model.model';
import { Principal } from 'app/core';
import { MeterModelService } from './meter-model.service';

@Component({
    selector: 'jhi-meter-model',
    templateUrl: './meter-model.component.html'
})
export class MeterModelComponent implements OnInit, OnDestroy {
    meterModels: IMeterModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private meterModelService: MeterModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.meterModelService.query().subscribe(
            (res: HttpResponse<IMeterModel[]>) => {
                this.meterModels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMeterModels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMeterModel) {
        return item.id;
    }

    registerChangeInMeterModels() {
        this.eventSubscriber = this.eventManager.subscribe('meterModelListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
