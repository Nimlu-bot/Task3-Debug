import express from 'express';
import db from './db.js';
import user from './controllers/usercontroller.js';
import game from './controllers/gamecontroller.js';
import auth from './middleware/validate-session.js';

const app = express();

db.sync();
app.use(express.json());

app.use('/api/auth', user);
app.use(auth);
app.use('/api/game', game);

app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong');
  next();
});

app.listen(4000, () => {
  console.log('App is listening on 4000');
});
