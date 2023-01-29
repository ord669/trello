var config

if (process.env.NODE_ENV === 'production') {
  config = require('./prod')
} else {
  config = require('./dev')
}
config.isGuestMode = true

module.exports = config

const OPENAI_API_KEY = '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'
