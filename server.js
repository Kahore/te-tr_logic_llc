const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

let app = express()
app.use(serveStatic(__dirname + '/dist'))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'))
  app.get(/.*/, (req, res)=> res.sendFile(__dirname+'/public/index.html'))
}
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
