const serverError = (err, req, res, next) => {
  res.status(err.status || 500).send('International Server Error');
};
