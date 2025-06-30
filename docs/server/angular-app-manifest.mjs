
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
    'index.csr.html': {size: 1078, hash: '7075c2f6e998e9f0a5183af91c7e5cf0600f96a5f7436186f55606f95693b6b6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: 'c620409d52126eabb74bd55a18559d174db9f4965f2fcd5d27e30d7e199d9e8e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14914, hash: '7e7d46a92b3c31836f594dcb9151fa2f880d7dc347f2c3b5a867c1d6f62347f9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
