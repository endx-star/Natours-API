const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
//  mongoose.connect(process.env.DATABASE_LOCAL,{
  mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected successfuly');
})


// const testTour = new Tour({
//   name: "The Park Camper",
//   price: 1500
// });

// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log('ERROR...👋', err);
// })


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is runing on port ${port}....`);
});
