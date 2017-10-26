
  // Create WebSocket connection.
  const socket = new WebSocket('ws://localhost:3322');

  // Connection opened
  socket.addEventListener('open', function(event) {
    console.log('Socket open!!');
  });

  // Listen for messages
  socket.addEventListener('message', function(event) {
    console.dir(event);
    console.log('Message from server ', event.data);
  });
module.exports = socket;
