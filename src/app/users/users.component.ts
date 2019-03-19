import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort} from '@angular/material';
import { User} from '../models';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AppComponent } from '../app.component';
import { UserService} from '../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    currentUser: User;
    users: User[] = [];

    displayedColumns = ['documento', 'usuario', 'nombre', 'apellido', 'sexo', 'especialidad', 'email', 'telefono', 'activo','actions'];
  	dataSource = new MatTableDataSource(ELEMENT_DATA);
  	index: number;
  	id: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private appComponent: AppComponent,
      public usuario: MatDialog, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this.loadAllUsers();
    	this.dataSource.sort = this.sort;
    	this.dataSource.paginator = this.paginator;
    }

    addNew(usuario: User) {

    	const dialogRef = this.usuario.open(AddUserComponent, {
          data: {usuario: User }
        });

    }

    // startEdit(i: number, id: number, nombre: string, apellido: string, sexo: string, especialidad: string,
    //  email: string, telefono: string, usuario: string, documento: string) {
    //
    //     this.id = id;
    //     // index row is used just for debugging proposes and can be removed
    //     this.index = i;
    //     console.log(this.index);
    //     const dialogRef = this.usuario.open(EditUserComponent, {
    //       data: {id: id, nombre: nombre, usuario: usuario, email: email, apellido: apellido, sexo: sexo,
    //        especialidad: especialidad, telefono: telefono, documento: documento}
    //     });
    // }

    desactivarItem(i: number, id: number, nombre: string, apellido: string, usuario: string) {
        this.index = i;
        this.id = id;
        const dialogRef = this.usuario.open(DeleteUserComponent, {
          data: {id: id, nombre: nombre, usuario: usuario, apellido: apellido}
        });
    }

    activarItem(i: number, id: number, nombre: string, apellido: string, usuario: string) {
        this.index = i;
        this.id = id;
        const dialogRef = this.usuario.open(ActivateUserComponent, {
          data: {id: id, nombre: nombre, usuario: usuario, apellido: apellido}
        });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

}

const ELEMENT_DATA: User[] = [
  {id: 1, nombre: 'Hydrogen', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'MASCULINO', usuario: 'coomecipar', email: 'H', activo: 'S'},
  {id: 2, nombre: 'Helium', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'MASCULINO', usuario: 'coomecipar', email: 'He', activo: 'S'},
  {id: 3, nombre: 'Lithium', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'MASCULINO', usuario: 'coomecipar', email: 'Li', activo: 'S'},
  {id: 4, nombre: 'Beryllium', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'FEMENINO', usuario: 'coomecipar', email: 'Be', activo: 'S'},
  {id: 5, nombre: 'Boron', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'FEMENINO', usuario: 'coomecipar', email: 'B', activo: 'N'},
  {id: 6, nombre: 'Carbon', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'FEMENINO', usuario: 'coomecipar', email: 'C', activo: 'N'},
  {id: 7, nombre: 'Nitrogen', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'FEMENINO', usuario: 'coomecipar', email: 'N', activo: 'N'},
  {id: 8, nombre: 'Oxygen', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'FEMENINO', usuario: 'coomecipar', email: 'O', activo: 'N'},
  {id: 9, nombre: 'Fluorine', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'FEMENINO', usuario: 'coomecipar', email: 'F', activo: 'N'},
  {id: 10, nombre: 'Neon', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'FEMENINO', usuario: 'coomecipar', email: 'Ne', activo: 'N'},
  {id: 11, nombre: 'Sodium', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'Na', activo: 'N'},
  {id: 12, nombre: 'Magnesium', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'Mg', activo: 'S'},
  {id: 13, nombre: 'Aluminum', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'Al', activo: 'S'},
  {id: 14, nombre: 'Silicon', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'Si', activo: 'S'},
  {id: 15, nombre: 'Phosphorus', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'P', activo: 'S'},
  {id: 16, nombre: 'Sulfur', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'S', activo: 'S'},
  {id: 17, nombre: 'Chlorine', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'Cl', activo: 'S'},
  {id: 18, nombre: 'Argon', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'Ar', activo: 'S'},
  {id: 19, nombre: 'Potassium', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'K', activo: 'S'},
  {id: 20, nombre: 'Calcium', apellido: 'Hydrogen', especialidad: 'Desarrollador', documento: '4992838', telefono: '021456030', sexo: 'Masculino', usuario: 'coomecipar', email: 'Ca', activo: 'S'},
];
