const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssModules: true
})

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }
};