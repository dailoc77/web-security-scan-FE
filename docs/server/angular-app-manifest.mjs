
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
    'index.csr.html': {size: 1078, hash: 'e230682360334ad41ec6ce22c977bf9c7065f666f861bddaa0ad1f4507f773e4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: 'bceb43cc981471f662a765161e126bcd20477b658913fc558a020fa2b63b9c83', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20111, hash: '12a2463ea7a4c11293fe86aa39db7872970ba0760b9d5ef3d45751db9d680c7b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W4FRUZWP.css': {size: 445, hash: 'fDiF7V5zqW0', text: () => import('./assets-chunks/styles-W4FRUZWP_css.mjs').then(m => m.default)}
  },
};
