const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { handlerErrors } = require('./middlewares/handlerErrors');
const routes = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handlerCors = require('./middlewares/handlerCors');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(handlerCors);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handlerErrors);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT);
});
