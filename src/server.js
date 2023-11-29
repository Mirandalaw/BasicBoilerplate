const app = require('./app');

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Express Server is Listening at ${PORT}`);
});
