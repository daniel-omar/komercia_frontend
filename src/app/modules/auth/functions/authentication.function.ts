import { inject } from '@angular/core';
import { AuthStatus } from '@auth/enums/auth-status.enum';
import { User } from '@auth/interfaces/user.interface';
import { Roles } from '@shared/enums';
import { SafeStorageService } from '@shared/services/safe-storage.service';

const enumRole: typeof Roles = Roles;

export const onAuthenticationSaveStorage = (user: User, token: string, refresh_token: string, _safeStorageService: SafeStorageService): void => {

    // sessionStorage.setItem('loginUsuario', JSON.stringify(user));
    // sessionStorage.setItem('token', token);
    // sessionStorage.setItem('authStatus', AuthStatus.authenticated);
    _safeStorageService.setItem('loginUsuario', JSON.stringify(user));
    _safeStorageService.setItem('token', token);
    _safeStorageService.setItem('refresh_token', refresh_token);
    _safeStorageService.setItem('authStatus', AuthStatus.authenticated);

}

export const onRefreshSaveStorage = (token: string, _safeStorageService: SafeStorageService): void => {

    _safeStorageService.setItem('token', token);

}

const onIsSupervisor = (user: User): boolean => {

    const { id_perfil } = user;

    const { SUPERVISOR } = enumRole;

    return id_perfil === SUPERVISOR;

}

const onIsVendedor = (user: User): boolean => {

    const { id_perfil } = user;

    const { VENDEDOR } = enumRole;

    return id_perfil === VENDEDOR;
}

const onIsAdministrador = (user: User): boolean => {

    const { id_perfil } = user;

    const { ADMINISTRADOR } = enumRole;

    return id_perfil === ADMINISTRADOR;
}