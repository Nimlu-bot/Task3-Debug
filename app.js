const express = require('express');
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const auth = require('./middleware/validate-session');

const app = express();

db.sync();
app.use(express.json());

app.use('/api/auth', user);
app.use(auth);
app.use('/api/game', game);
app.listen(4000, () => {
  console.log('App is listening on 4000');
});
