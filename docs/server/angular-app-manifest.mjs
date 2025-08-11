
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
    'index.csr.html': {size: 1078, hash: '7230d9656ad3e126682518410fdf8d4e64ed3706f4c31b675b99f4a0fed9ba63', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: '8af852bc2790d5aff9e2b31f3386a1b4e750ac160f70d334929f041c492c5b23', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 12569, hash: '0f17b7798060e97df173486aa3f747e6a91919deaa086eb0715eee932db64f11', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 12569, hash: '0f17b7798060e97df173486aa3f747e6a91919deaa086eb0715eee932db64f11', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
