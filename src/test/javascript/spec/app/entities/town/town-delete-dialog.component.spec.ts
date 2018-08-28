/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HumbaTestModule } from '../../../test.module';
import { TownDeleteDialogComponent } from 'app/entities/town/town-delete-dialog.component';
import { TownService } from 'app/entities/town/town.service';

describe('Component Tests', () => {
    describe('Town Management Delete Component', () => {
        let comp: TownDeleteDialogComponent;
        let fixture: ComponentFixture<TownDeleteDialogComponent>;
        let service: TownService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [TownDeleteDialogComponent]
            })
                .overrideTemplate(TownDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TownDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TownService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
