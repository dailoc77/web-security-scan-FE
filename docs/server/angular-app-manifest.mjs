
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
    'index.csr.html': {size: 1078, hash: 'd3ac16b2477f9895fcc9c459c125d53d070c56d029a903f2dca3cd34ac100c75', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: '26260e28ca4118473728aebb0372ff2621cef432ee5c9f806e1241d97ebe7a59', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 19128, hash: '764653f177d747c1342549088063bb19bf06c632f4cff01a62b8082dbd1e8ef6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
