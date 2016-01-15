
var CLIENT_ACCESS = {};

exports.getOrCreate = function(readerId) {
  var clientAuth = CLIENT_ACCESS[readerId];
  if (!clientAuth) {
    clientAuth = {
      viewedUrls: {}            
    };
    CLIENT_ACCESS[readerId] = clientAuth;
  }
  return clientAuth;
}

exports.findByReaderId = function(readerId) {
  return CLIENT_ACCESS[readerId];
}

exports.deleteByReaderId = function(readerId) {
  delete CLIENT_ACCESS[readerId]
}


