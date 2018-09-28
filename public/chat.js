$(document).ready(function() {
  var socket     = io(document.location.origin);
  var message    = $('#message');
  var handle     = $('#handle');
  var sendButton = $('#send');
  var output     = $('#output');

  sendButton.click(function(e) {
    e.preventDefault();

    socket.emit('chat', {
      handle: handle.val(),
      message: message.val()
    });
  });

  socket.on('chat', function(data) {
    output.append('<p><strong>' + data.handle + ': ' + '</strong>' +
      data.message + '</p>');
  });
});
