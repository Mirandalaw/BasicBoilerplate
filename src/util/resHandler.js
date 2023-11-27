getMethodSuccessResponse = (res, result) => {
  return res.status(200).send({ result: result });
};

postMethodSuccessResponse = (res, message) => {
  return res.status(201).send({ result: message });
};

module.exports = { getMethodSuccessResponse, postMethodSuccessResponse };
