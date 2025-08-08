
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/web-security-scan-FE/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/web-security-scan-FE"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1078, hash: 'f3fe97ef038ad3ab156779fb1465a4c677a90d5aa37c416fa1369c0c8ff25b22', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: '6cba8858fd25139e47a10d122e33c4d9a8f7af4edd811970088514e80921ceff', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20175, hash: 'b7724e75d15de694a13a85ce244030aede83a3f95596c124caa32cf13da4919a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
