module.exports = function(request, response, next) {
  console.log(request.method + ":" + request.url);
  next();
}
