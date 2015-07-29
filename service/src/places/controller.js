import _ from 'lodash'
import Place from './Place'
import api from '../api'

var sendResponse = api.sendResponse;

const find = sendResponse(req => Place.find(req.query));

const create = sendResponse((req, res) =>{
  res.status(201);
  var place = new Place({
    coordenates: req.body
  });
  return new Promise((resolve, reject) =>
    place.save().then(resolve, reject));
});

export default {
  find,
  create
};