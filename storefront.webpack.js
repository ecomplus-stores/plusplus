const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './js/AccountForm.js': path.resolve(__dirname, 'template/js/custom-js/js/AccountForm.js')
    }
  }
})