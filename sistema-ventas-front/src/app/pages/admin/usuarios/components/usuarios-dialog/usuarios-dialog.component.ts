import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-forms';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Rol } from '../../../../../shared/models/rol.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrl: './usuarios-dialog.component.scss',
})
export class UsuariosDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  titleButton = 'Guardar';
  actionTODO = Action.NEW;
  roles: Rol[] = [];
  userForm = this.fb.group({
    cveusuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.email]],
    rol: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UsuarioService,
    public baseForm: BaseForm,
    private dialogRef: MatDialogRef<UsuariosDialogComponent>
  ) {}

  ngOnInit(): void {
    this.pathData();
    this.userService
      .getRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Rol[]) => {
        this.roles = res;
        this.pathData();
      });
  }

  pathData() {
    if (this.data.user.cveusuario) {
      this.titleButton = 'Actualizar';
      this.actionTODO = Action.EDIT;

      this.userForm.patchValue({
        cveusuario: this.data.user.cveusuario,
        nombre: this.data.user.nombre,
        apellidos: this.data.user.apellidos,
        username: this.data.user.username,
        rol: this.data.user.rol.cverol,
      });
      this.userForm.get('username')?.disable();

      //Eliminar las validaciones password

      this.userForm.get('password')?.setValidators(null);
      this.userForm.get('password')?.setErrors(null);
      this.userForm.get('confirmPassword')?.setValidators(null);
      this.userForm.get('confirmPassword')?.setErrors(null);

      this.userForm.updateValueAndValidity();
    } else {
      //insert
      this.titleButton = 'Guardar';
      this.actionTODO = Action.NEW;
    }
  }

  onSave() {
    if (this.userForm.invalid) return;

    let formValue = this.userForm.getRawValue();

    if (this.actionTODO === Action.NEW) {
      let { confirmPassword, cveusuario, ...newUser } = formValue;

      this.userService.newUser(newUser).subscribe(
        (resp) => {
          this.dialogRef.close(resp);
        },
        (error) => {}
      );
    } else {
      let { confirmPassword, password, username, ...updateUser } = formValue;
      console.log(updateUser);
      this.userService.updateUser(updateUser).subscribe(
        (resp) => {
          this.dialogRef.close(resp);
        },
        (error) => {
          console.error(error);
          //Alerta
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
