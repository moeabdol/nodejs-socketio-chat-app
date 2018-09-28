$(document).ready(function() {
  var socket     = io(document.location.origin);
  var message    = $('#message');
  var handle     = $('#handle');
  var sendButton = $('#send');
  var output     = $('#output');
  var feedback   = $('#feedback');

  sendButton.click(function(e) {
    e.preventDefault();

    socket.emit('chat', {
      handle: handle.val(),
      message: message.val()
    });

    message.val('');
  });

  message.keypress(function() {
    socket.emit('typing', {
      handle: handle.val()
    });
  });

  socket.on('chat', function(data) {
    feedback.html('');
    output.append('<p><strong>' + data.handle + ': ' + '</strong>' +
      data.message + '</p>');
  });

  socket.on('typing', function(data) {
    feedback.html('<p><em>' + data.handle +
      ' is typing a message...</em></p>');
  });
});
