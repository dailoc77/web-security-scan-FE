
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
    'index.csr.html': {size: 1078, hash: 'ba0fdb5526172a787ff6a312524892d64fcf74462071bfdafdb108d0fb615939', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: '6c71312a8e509f3963816884b376f0ed8363acbec9cf8e07327c57e2e62242a6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14413, hash: 'b5ff5e380f6b2a5277c6cedbf70768bb6c8bc082f6cc3c6dac667dc015d904d8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
