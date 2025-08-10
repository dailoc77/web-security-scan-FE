
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/web-security-scan-FE/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/web-security-scan-FE/auth",
    "route": "/web-security-scan-FE"
  },
  {
    "renderMode": 2,
    "route": "/web-security-scan-FE/auth"
  },
  {
    "renderMode": 2,
    "redirectTo": "/web-security-scan-FE/auth",
    "route": "/web-security-scan-FE/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/web-security-scan-FE/auth",
    "route": "/web-security-scan-FE/register"
  },
  {
    "renderMode": 2,
    "route": "/web-security-scan-FE/dashboard"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1078, hash: 'd950b915ce757fcac953b78f8bf6a14b276df3b7dcb25e6b196b72b87864c48e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: 'f3e38d5775e44161426f6de70c22368da5f3a145c5c3362b933aae3a8fb26e76', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 12569, hash: 'edbed247879204998cea9f0448817d0af38eb2488faf693c4fb1ddfcdb68ebec', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 12569, hash: 'edbed247879204998cea9f0448817d0af38eb2488faf693c4fb1ddfcdb68ebec', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
