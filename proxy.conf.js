const PROXY_CONFIG = [
  {
    context: [
      '/archive',
      '/data/comcat',
      '/data/dyfi',
      '/earthquakes/feed',
      '/earthquakes/map',
      '/fdsnws',
      '/lib',
      '/realtime',
      '/scenarios',
      '/theme',
      '/ws/geoserve'
    ],
    target: 'https://dev-earthquake.cr.usgs.gov',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
