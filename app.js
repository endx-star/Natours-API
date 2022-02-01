const express = require('express');

const app = express();

app.get('/', () => {
  console.log('hello from the server');
});
const port = 3000;
app.listen(3000, () => {
  console.log(`The server is runing on port ${port}....`);
});
