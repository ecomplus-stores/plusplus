const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './js/AccountForm.js': path.resolve(__dirname, 'template/js/custom-js/js/AccountForm.js'),
      './js/TheCart.js': path.resolve(__dirname, 'template/js/custom-js/js/TheCart.js'),
      './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/html/TheCart.html'),
      './js/TheAccount.js': path.resolve(__dirname, 'template/js/custom-js/js/TheAccount.js'),
      './js/BuyTogether.js': path.resolve(__dirname, 'template/js/custom-js/js/BuyTogether.js'),
      './html/BuyTogether.html': path.resolve(__dirname, 'template/js/custom-js/html/BuyTogether.html'),
      './html/TheAccount.html': path.resolve(__dirname, 'template/js/custom-js/html/TheAccount.html')

    }
  }
})