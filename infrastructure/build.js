const dev = require('./dev')
const prod = require('./prod')

const environment = process.env.NODE_ENV

module.exports = environment === 'production' ? prod : dev