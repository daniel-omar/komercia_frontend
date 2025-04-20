import { Injectable } from '@angular/core';
import { environment } from '@env/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Roles } from '@shared/enums';
import { constanst } from '@shared/constants';
import { User } from '@auth/interfaces/user.interface';
import { TokenService } from '@shared/services/token.service'
import { catchError, combineLatest, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';

@Injectable({
    providedIn: 'root'
})
export class MenuRoleService {

    private enumRoles: typeof Roles = Roles;

    constructor(
        private http: HttpClient,
        private readonly _tokenService: TokenService) { }

    private getUser(): User | null {

        const sessionStorageUser = this._tokenService.getUser;
        return sessionStorageUser;

    }

    public onVisibleAdministracion(): boolean {

        const { SUPERVISOR, ADMINISTRADOR } = this.enumRoles;
        const { id_perfil } = this.getUser()!;

        if ([SUPERVISOR, ADMINISTRADOR].includes(id_perfil)) return true;
        return false;
    }

    public onVisibleOpcionesMenu(): boolean {

        const { SUPERVISOR, ADMINISTRADOR } = this.enumRoles;
        const { id_perfil } = this.getUser()!;

        if ([SUPERVISOR, ADMINISTRADOR].includes(id_perfil)) return true;
        return false;

    }

    public onVisibleUsuarios(): boolean {

        const { ADMINISTRADOR } = this.enumRoles;
        const { id_perfil } = this.getUser()!;

        if ([ADMINISTRADOR].includes(id_perfil)) return true;
        return false;

    }

    public onVisibleReportes(): boolean {

        const { SUPERVISOR, ADMINISTRADOR, VENDEDOR } = this.enumRoles;
        const { id_perfil } = this.getUser()!;

        if ([SUPERVISOR, ADMINISTRADOR, VENDEDOR].includes(id_perfil)) return true;
        return false;

    }

    public onVisibleClientes(): boolean {

        const { ADMINISTRADOR } = this.enumRoles;
        const { id_perfil } = this.getUser()!;

        if ([ADMINISTRADOR].includes(id_perfil)) return true;
        return false;

    }

    public onVisibleProductos(): boolean {

        const { ADMINISTRADOR } = this.enumRoles;
        const { id_perfil } = this.getUser()!;

        if ([ADMINISTRADOR].includes(id_perfil)) return true;
        return false;

    }
}
