import { RolesEnum } from 'definitions/enums/globals'

export const adminRoutes = {
  adminHome: { path: '/plataforma/admin/home', allowedRoles: [RolesEnum.ADMIN] },
  adminProfile: { path: '/plataforma/admin/perfil', allowedRoles: [RolesEnum.ADMIN] },
}


export const auth = {
  signIn: { path: '/auth/iniciar-sesion', allowedRoles: [] },
}

export const globals = {
  404: { path: '/404', allowedRoles: [] },
}

export const routes = {
  ...adminRoutes,
  ...auth,
  ...globals,
}
