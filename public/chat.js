$(document).ready(function() {
  var socket = io(document.location.origin);

  socket.on('connect', function() {
    console.log(socket.id);
  });
});
