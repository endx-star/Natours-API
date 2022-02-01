const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev_data/data/tour-simple.json`)
);

// 2) HANDLERS
const getTours = (req, res) => {
  res.status(200).json({
    statu: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev_data/data/tour-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        statu: 'done it',
        data: {
          newTour,
        },
      });
    }
  );
};
const getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    statu: 'success',
    data: {
      tour,
    },
  });
};
const updateTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  const entryIndex = tours.indexOf(tour);
  tours[entryIndex].price = req.body.price;
  tours[entryIndex].duration = req.body.duration;

  const updateTour = tours[entryIndex];
  // tours.push(updateTour);
  res.status(201).json({
    statu: 'updated',
    data: {
      updateTour,
    },
  });
};
const deleteTour = (req, res) => {
  // console.log(req.params.id * 1);
  // console.log(tours.length);
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTING
app.route('/api/v1/tours').get(getTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//4) STARTING SERVER
const port = 3000;
app.listen(3000, () => {
  console.log(`The server is runing on port ${port}....`);
});
