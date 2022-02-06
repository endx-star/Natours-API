const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModels');


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
// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tour-simple.json`, 'utf-8'));

// IMPORT DATA TO DB
const importData = async () => {
    try {

        await Tour.create(tours);
        console.log('data loaded successfully');
    } catch (err) {
        console.log(err);
    }
    process.exit();
    
}

// DELETE DATA FROM DB
const deleteData = async () => {
    try {

        await Tour.deleteMany();
        console.log('data deleted successfully')
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// console.log(process.argv);
// process.exit();
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
