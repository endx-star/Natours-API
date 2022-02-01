const express = require('express');
const fs     = require('fs');

const app = express();

app.get('/api/v1/tours', (req, res) => {
 
})
const port = 3000;
app.listen(3000, () => {
  console.log(`The server is runing on port ${port}....`);
});
