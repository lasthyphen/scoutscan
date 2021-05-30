const env = process.env.NODE_ENV || 'development'
const controllers = require('./controllers')
const fs = require('fs')

const config = require('./config/config')[env]

let app = require('express')()
require('./config/express')(app)

require('./config/routes')(app)

app.listen(config.port, () => console.log(`Server start on port ${config.port}`))

setInterval(() => {
  controllers.avax.avaxPrice()
}, 8000)

const endpoint = 'http://135.181.144.201:9650'
// let i = 0

setInterval(() => {
  // i = (i + 1) % 3
  controllers.platform.blockHeight(endpoint)
  controllers.validators.validators(endpoint)
  controllers.node.info(endpoint)
  controllers.node.peersPost(endpoint)
}, 30000)

let index = 0
controllers.validators.getUptimes(index)

setInterval(() => {
  try {
    let validators = fs.readFileSync('validators.json').toString()
    validators = JSON.parse(validators)
      .validators
    controllers.validators.getUptimes(index)
    index = (index + 10) % validators.length
  } catch (err) {
    console.log(err)
  }
}, 400000)
