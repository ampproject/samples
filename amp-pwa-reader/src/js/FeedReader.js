class FeedReader {

  constructor() {

  }

  fetch(category) {

    let rssUrl = shadowReader.backend.getRSSUrl(category);
    let yqlQuery = 'select * from feed where url = \'' + encodeURIComponent(rssUrl) + '\'';
    let yqlUrl = 'https://query.yahooapis.com/v1/public/yql?q=' + yqlQuery + '&format=json';

    return fetch(yqlUrl)
      .then(response => response.json() )
      .then(rss => {

        var entries = rss.query.results.item;
        return entries.map(entry => {
          return {
            title: shadowReader.backend.getRSSTitle(entry),
            description: shadowReader.backend.getRSSDescription(entry),
            link: entry.link,
            image: shadowReader.backend.getRSSImage(entry)
          };
        });

      });

  }

}