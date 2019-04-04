import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort} from '@angular/material';
import { User} from '../core/models';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AppComponent } from '../app.component';
import { UserService} from '../core/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    currentUser: User;
    users: User[] = [];

    displayedColumns = ['documento', 'usuario', 'nombre', 'apellido', 'sexo', 'especialidad', 'email', 'telefono', 'activo','actions'];
  	dataSource = new MatTableDataSource();
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
    }

    activarItem(i: number, id: number, nombre: string, apellido: string, usuario: string) {
    }

    private loadAllUsers() {
        //this.userService.getAll().subscribe(users => { this.users = users; });
    }

}
