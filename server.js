const
  fs = require('fs'),
  express = require('express'),
  app = express(),

  env = process.env.NODE_ENV.trim().toLowerCase()



if (env == 'production')
  app.use(express.static(__dirname + '/dist'))
else if (env == 'development')
  app.use(express.static(__dirname + '/build-dev'))
else
  throw new Error('Node env must match /production|development/i')

app.use('/lib', express.static(__dirname + '/lib'))
app.use('/images', express.static(__dirname + '/images'))

app.get('*', (req, res) => {
  fs.readFile(__dirname + '/index.html', { encoding: 'utf8' }, (err, data) => {
    if (err)
      throw err

    let
      start = data.indexOf(`<script`),
      end = data.lastIndexOf(`</script>`)

    if (env == 'development')
      data = data.replace(data.substring(start, end), `<script src="/index.js" type="module"></script>`)

    res.send(data)
  })
})

app.listen(3000)
