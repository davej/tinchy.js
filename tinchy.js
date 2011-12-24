(function() {
  var app, express, fs, generateTinchyId, tryRead;
  var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; };

  fs = require('fs');

  express = require('express');

  app = express.createServer().use(express.bodyParser()).listen(3000);

  generateTinchyId = function(length) {
    var allowedChars, tinchyId;
    if (length == null) length = 3;
    allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    tinchyId = (function() {
      var _i, _results;
      _results = [];
      for (_i = 1; 1 <= length ? _i <= length : _i >= length; 1 <= length ? _i++ : _i--) {
        _results.push(allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)));
      }
      return _results;
    })();
    return tinchyId.join('');
  };

  tryRead = function(filename) {
    try {
      return JSON.parse(fs.readFileSync(filename, 'utf-8'));
    } catch (_error) {}
  };

  app.get('/', function(req, res) {
    return res.send('<h1>Get your tinchy URL!</h1>\n<form method="post">\n  <input type="text" name="url" value="http://">\n  <input type="submit" value="Make it tinchy!">\n</form>');
  });

  app.post('/', function(req, res) {
    var fattyUrl, json, tinchyId;
    fattyUrl = req.body.url || '';
    if (fattyUrl.substring(0, 7) === 'http://' || fattyUrl.substring(0, 8) === 'https://') {
      json = tryRead('tinchy.json') || {};
      while (!(tinchyId != null) || __indexOf.call(json, tinchyId) >= 0) {
        tinchyId = generateTinchyId();
      }
      json[tinchyId] = fattyUrl;
      fs.writeFileSync('tinchy.json', JSON.stringify(json));
      res.send("Your tinchy url is <a href=" + (req.url + tinchyId) + ">" + (req.url + tinchyId) + "</a>");
    }
    return res.send("Boo, urls must begin with 'http://' or 'https://', <a href=" + req.url + ">enter a proper url this time</a>.");
  });

  app.get('/:tinchyId', function(req, res) {
    var json;
    json = tryRead('tinchy.json') || {};
    if (!(json[req.params.tinchyId] != null)) {
      res.send("Nope, this tinchy URL wasn't found.");
    }
    return res.redirect(json[req.params.tinchyId]);
  });

}).call(this);
