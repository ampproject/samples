var express = require('express')
  , router = express.Router()

var ARTICLES = [];
for (var i = 0; i <= 10; i++) {
  ARTICLES.push({id: i, title: 'Article ' + (i + 1)});
}

/** List all Articles */
router.get('/', function(req, res) {
  res.locals = { articles: ARTICLES } ;
  res.render('list', {
  });
});

/** View a single Article */
router.get('/((\\d+))', function(req, res) {
  id = parseInt(req.params[0]);
  if (!ARTICLES[id]) {
    res.sendStatus(404);
    return;
  }

  host = req.get('host');
  // http works only on localhost
  protocol = host.startsWith('localhost') ? 'http' : 'https';
  res.locals = { 
    host: protocol + '://' + host,
    id: id,
    title: ARTICLES[id].title,
    next: nextArticleId(id),
    prev: prevArticleId(id)
  };
  res.render('index', {});
});

function prevArticleId(id) {
  prevId = id - 1;
  return nextId >= 0 ? prevId : false;
}

function nextArticleId(id) {
  nextId = id + 1;
  return nextId < ARTICLES.length ? nextId : false;
}

module.exports = router
