const express = require('express');
const { router } = require('./route');

const PORT = 3030;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Express Server is Listening at ${PORT}`);
});
