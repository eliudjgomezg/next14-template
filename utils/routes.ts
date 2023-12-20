import { Roles } from 'definitions/enums/globals'

export const exampleRoutes = {
  home: { path: '/', allowedRoles: [] },
  AdminHome: { path: '/plataforma/admin/home', allowedRoles: [Roles.ADMIN] },
}

export const auth = {
  signIn: { path: '/auth/iniciar-sesion', allowedRoles: [] },
}

export const globals = {
  404: { path: '/404', allowedRoles: [] },
}

export const routes = {
  ...exampleRoutes,
  ...auth,
  ...globals,
}
