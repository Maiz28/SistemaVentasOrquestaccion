import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../shared/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosDialogComponent } from './components/usuarios-dialog/usuarios-dialog.component';
import { UsuarioService } from './services/usuario.service';
import { Subject, takeUntil } from 'rxjs';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<any>();
  constructor(private dialog: MatDialog, private userService: UsuarioService) {}
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: String[] = [
    'nombre',
    'apellido',
    'username',
    'rol',
    'acciones',
  ];

  usuario: Usuario[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onOpenModal(user = {}) {
    const dialogRef = this.dialog.open(UsuariosDialogComponent, {
      maxWidth: '100%',
      data: {
        user,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.getUsers();
        }
      });
  }

  ngOnDestroy(): void {}

  getUsers() {
    this.userService.getUsers().subscribe((resp) => {
      this.dataSource.data = resp;
    });
  }
  confirmDelete(userId: number, username: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {
        message: `¿Está seguro de que desea eliminar el usuario ${username}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(cveUsuario: number) {
    const cveU = { cveusuario: cveUsuario };

    this.userService.deleteUser(cveU).subscribe((resp) => {
      this.getUsers();
    });
  }
}
