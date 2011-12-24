fs = require('fs')
express = require('express')
app = express.createServer().use(express.bodyParser()).listen(3000)

generateTinchyId = (length = 3) ->
    allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    tinchyId = for [1..length]
        allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
    tinchyId.join('')
    
tryRead = (filename) -> try JSON.parse(fs.readFileSync(filename, 'utf-8'))
    
app.get '/', (req, res) ->
    res.send '''
    <h1>Get your tinchy URL!</h1>
    <form method="post">
      <input type="text" name="url" value="http://">
      <input type="submit" value="Make it tinchy!">
    </form>
    '''
    
app.post '/', (req, res) ->
    fattyUrl = req.body.url or ''
    if fattyUrl.substring(0,7) == 'http://' or fattyUrl.substring(0,8) == 'https://'
        json = tryRead('tinchy.json') or {}
        while !tinchyId? or tinchyId in json
            tinchyId = generateTinchyId()
        json[tinchyId] = fattyUrl
        fs.writeFileSync('tinchy.json', JSON.stringify(json))
        res.send("Your tinchy url is <a href=#{req.url + tinchyId}>#{req.url + tinchyId}</a>")
    res.send("Boo, urls must begin with 'http://' or 'https://', <a href=#{req.url}>enter a proper url this time</a>.")
            
app.get '/:tinchyId', (req, res) ->
    json = tryRead('tinchy.json') or {}
    if !json[req.params.tinchyId]? then res.send("Nope, this tinchy URL wasn't found.")
    res.redirect(json[req.params.tinchyId])
