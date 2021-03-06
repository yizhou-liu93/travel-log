const express = require('express');
// morgan: log request to console
const morgan = require('morgan');
// helmet: secure request header
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
require('dotenv').config();
const logs = require('./api/logs');
// getting-started.js
mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, this is root route',
  });
});
// routes
app.use('/api/logs', logs);
// middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
