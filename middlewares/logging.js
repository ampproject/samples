/* Log a incoming requests */
module.exports = function(request, response, next) {
  console.log(request.method + ":" + request.url);
  next();
};
