const app = require('./app');

const port = 3000;
app.listen(3000, () => {
  console.log(`The server is runing on port ${port}....`);
});
