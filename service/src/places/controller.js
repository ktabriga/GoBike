import _ from 'lodash';
import Place from './Place';

const find = (req, res, next) =>
  Place.find(req.query)
    .then(places => res.json(places))
    .catch(next);

const create = (req, res, next) => {
  var data = {
    coordenates: req.body
  };
  var place = new Place(data);
  place.save(place => res.status(201)
    .json(place), next);
};

export default {
  find,
  create
};