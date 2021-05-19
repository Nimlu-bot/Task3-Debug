import express from 'express';
import db from './db.js';
import user from './controllers/usercontroller.js';
import game from './controllers/gamecontroller.js';
import auth from './middleware/validate-session.js';

const app = express();

db.authenticate().then(
  () => {
    console.log('Connected to DB');
  },

  (err) => {
    console.log(`Error: ${err}`);
  },
);

db.sync();
app.use(express.json());

app.use('/api/auth', user);
app.use(auth);
app.use('/api/game', game);
app.listen(4000, () => {
  console.log('App is listening on 4000');
});
