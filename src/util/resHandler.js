SuccessResponse = (res, message, statusCode) => {
  return res.status(statusCode).send({ result: message });
};

FailedResponse = (res, ErrorMessage, statusCode) => {
  return res.status(statusCode).send({ Error: ErrorMessage });
};

module.exports = { SuccessResponse, FailedResponse };
