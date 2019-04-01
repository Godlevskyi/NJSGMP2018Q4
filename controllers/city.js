import { cityModel } from '../models/City';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomCity = (req, res, next) => {
  const number = getRandomInt(0, 1);
  cityModel.find({}, (err, data) => {
    if (err) next(err);
    res.send(data[number]);
  })
};

export const getAllCities = (req, res, next) => {
  cityModel.find({}, (err, data) => {
    if (err) next(err);
    res.send(data);
  })
};

export const createNewCity = (req, res, next) => {
  const {
    name,
    country,
    capital,
    location,
  } = req.body;
  const modifiedData = getLastModifiedDate();
  cityModel.findOrCreate({ name, country, capital, location },
    { ...modifiedData },
    (err, data) => {
      if (err) next(err);
      res.send(data);
    }
  );
};

export const updateCityById = (req, res, next) => {
  const {
    id,
    name,
    country,
    capital,
    location,
  } = req.params;
  const cityId = Number(id);
  const modifiedData = getLastModifiedDate();
  cityModel.findOneAndUpdate({ _id: cityId },
    {
      $set: { name, country, capital, location },
      ...modifiedData
    }, (err, city) => {
      if (err) {
        cityModel.create({ name, country, capital, location },
          { ...modifiedData },
          (err, data) => {
            if (err) next(err);
            city.send(data);
          }
        )
      } else {
        res.send(city);
      }
    });
};

export const deleteCityById = (req, res) => {
  const id = Number(req.params.id);
  cityModel.deleteOne({ id: id }, (err, data) => {
    if (err) next(err);
    res.send('This city was deleted: ' + data);
  });
};

