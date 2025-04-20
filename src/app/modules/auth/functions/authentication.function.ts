import { User } from '@auth/interfaces/user.interface';
import { Roles } from '@shared/enums';

const enumRole: typeof Roles = Roles;

export const onAuthenticationSaveStorage = (user: User, token: string): void => {

    sessionStorage.setItem('loginUsuario', JSON.stringify(user));
    sessionStorage.setItem('token', token);

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