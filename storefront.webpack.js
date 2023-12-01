const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './js/AccountForm.js': path.resolve(__dirname, 'template/js/custom-js/js/AccountForm.js'),
      './js/TheCart.js': path.resolve(__dirname, 'template/js/custom-js/js/TheCart.js'),
      './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/html/TheCart.html')
    }
  }
})