const express = require('express');
const cors = require('cors');
// Router 추가

const morgan = require('morgan');

module.exports = {
  expressAplication: async (app) => {
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }

    app.use('/upload', express.static('upload'));
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
  },
  app: express(),
};
