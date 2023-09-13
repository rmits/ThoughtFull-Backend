const express = require('express');
const router = express.Router();
const db = require('./config/connection');
const apiRoutes = require('./routes/api-index');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use('/api', apiRoutes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});