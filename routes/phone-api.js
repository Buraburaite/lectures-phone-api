const Router = require('express').Router;
const Phone = require('../models/phone-model.js');
const mongoose = require('mongoose');

const apiRoutes = Router();

apiRoutes.get('/phones', (req, res, next) => {
  Phone.find({}, (err, phonesList) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(phonesList);
  });
});

apiRoutes.get('/phones/:id', (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message : 'Specified id is not valid'
    });
    return;
  }

  Phone.findById(id, (err, thePhone) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(thePhone);
  });
});

apiRoutes.post('/phones', (req, res, next) => {
  const thePhone = new Phone({
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  });

  thePhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'new Phone created!',
      id: thePhone.id
    });
  });
});

apiRoutes.put('/phones/:id', (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message : 'Specified id is not valid'
    });
    return;
  }

  const updates = {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  };

  Phone.findByIdAndUpdate(id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'the phone was updated successfully!',
      id: id
    });
  });
});

apiRoutes.delete('/phones/:id', (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message : 'Specified id is not valid'
    });
    return;
  }

  Phone.remove({ _id: id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Phone has been removed!'
    });
  });
});

module.exports = apiRoutes;
