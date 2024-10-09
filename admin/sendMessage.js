const axios = require('axios');

async function sendMessage() {
  try {
    const response = await axios.post('http://localhost:8080/send-message', {
      type: 'chat',
      value: 'Hello from admin script!'
    });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

sendMessage();
