import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { ApiService } from '@core/service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalScheduleComponent } from '../modal-schedule/edit-modal-schedule';
import { AddModalScheduleComponent } from '../modal-schedule/add-modal-schedule';
import { ViewModalScheduleComponent } from '../modal-schedule/view-modal-schedule';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  modelForm: FormGroup;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = 'es';
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Editar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.apiService.get('/citas/' + event.id)
        .subscribe(res => {
          if(res.status == 200){
            res.model.fechaConsulta = new Date(res.model.fechaConsulta);
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = res.model;
            const dialogRef = this.dialog.open(EditModalScheduleComponent,dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
              this.loadCalendar(false);
            });
          }
        });
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Eliminar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];



  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private apiService: ApiService,
    private modal: NgbModal
  ) {}

  ngAfterViewInit(){
    this.loadCalendar(false);
    this.refresh.next();
  }

  ngOnInit() {
    this.initFormBuilder();
  }

  public loadCalendar(filter:boolean) {
    let groupOp = "AND";
    let filterForm = null;
    if(filter){
      filterForm = JSON.stringify(this.modelForm.value);
    }

    this.apiService.getList('/citas', filterForm , null,
    null, null, true, groupOp).subscribe(res => {
      if(res.status == 200){
        this.events = [];
        res.rows.forEach(model => {
          this.events.push({
            start: new Date(model.fechaInicio),
            end: new Date(model.fechaFin),
            title: (model.cliente.persona.documento
            +  (model.cliente.persona.primerNombre == null ? '' : ' / ' + model.cliente.persona.primerNombre)
            + (model.cliente.persona.segundoNombre == null ? '' : ' ' + model.cliente.persona.segundoNombre)
            + (model.cliente.persona.primerApellido == null ? '' : ', ' + model.cliente.persona.primerApellido)
            + (model.cliente.persona.segundoApellido == null ? '' : ' ' + model.cliente.persona.segundoApellido)
            + ' - ' + model.horaInicio + '/' + model.horaFin
            ),
            color: colors.yellowsunflower,
            actions: this.actions,
            id: (model.id).toString(),
          });
        });
        this.refresh.next();
      }
    });
  }

  public initFormBuilder() {
    this.modelForm = this.formBuilder.group({
      id: null,
      codigoConsulta: null ,
      fechaConsulta: [null, [Validators.required]],
      horaInicio: [null, [Validators.required]],
      horaFin: [null, [Validators.required]],
      tipoCitas: [null, [Validators.required]],
      estadoCitas: [null, [Validators.required]],
      funcionario: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      observacion: null,
      recordatorio: null
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modelForm.get(form)).setValue(data);
    this.loadCalendar(true);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddModalScheduleComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        this.loadCalendar(false);
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
