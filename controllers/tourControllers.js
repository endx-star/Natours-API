const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev_data/data/tour-simple.json`)
);

// 2) HANDLERS
exports.getTours = (req, res) => {
  res.status(200).json({
    statu: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.createTour = (req, res) => {
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
exports.getTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
