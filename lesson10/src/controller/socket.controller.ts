export const socketController = {
  messageCreate: (io: any, socket: any, data: any) => {
    console.log('****************************');
    console.log(data);
    console.log('****************************');

    // ONE TO ONE
    // socket.emit('message:get-all', {messages: [{text: data.message}]});

    // SEND TO ALL ONLINE USERS
    // io.emit('message:get-all', {messages: [{text: data.message}]});

    socket.broadcast.emit('message:get-all', 'TEST');
  }
}
