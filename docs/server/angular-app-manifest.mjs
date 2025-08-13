
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
    'index.csr.html': {size: 1078, hash: '6ab278d08939692b89485cd1b9fbe85007b7dc47fac920dd48ccdac5e9be8c9d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: '6f3b581b88da72a3c3fef205b4fa29a6c6f263bede377c50c76d6352cd4d9137', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 12939, hash: '3647bc3b2ca20c761121131275c03ace4f1327a5fd44a52adf899e3df3e40117', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 12939, hash: '3647bc3b2ca20c761121131275c03ace4f1327a5fd44a52adf899e3df3e40117', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 12939, hash: '3647bc3b2ca20c761121131275c03ace4f1327a5fd44a52adf899e3df3e40117', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
