function handler(event) {
  var request = event.request;
  if (request.uri.indexOf('/test-media/') === 0) {
    request.uri = request.uri.substring(11);
  }
  return request;
}
