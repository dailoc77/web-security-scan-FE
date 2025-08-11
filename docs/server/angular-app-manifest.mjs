
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
  },
  {
    "renderMode": 2,
    "route": "/web-security-scan-FE/admin"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1078, hash: 'b81e41be627bf0156b6cee17a9f3f8ca9d361a8ba9456dde31b1152dce5b09ba', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: '976b181ecb062afc0eb7148d758869023139925e606b872479a82c0351d01e47', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 12939, hash: '9885774e2423ede410b564643fb92096eb70eec78a0da33943084441e5af48e5', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 12939, hash: '9885774e2423ede410b564643fb92096eb70eec78a0da33943084441e5af48e5', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 12939, hash: '9885774e2423ede410b564643fb92096eb70eec78a0da33943084441e5af48e5', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
