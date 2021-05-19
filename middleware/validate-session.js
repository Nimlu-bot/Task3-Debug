const jwt = require('jsonwebtoken');
const DataTypes = require('sequelize');
const DB = require('../db');
const UserModel = require('../models/user');

const User = UserModel(DB, DataTypes);

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
      return res
        .status(403)
        .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(
      sessionToken.split(' ')[1],
      'lets_play_sum_games_man',
      (err, decoded) => {
        if (decoded) {
          User.findOne({ where: { id: decoded.id } }).then(
            (user) => {
              req.user = user;
              console.log(`user: ${user}`);
              next();
            },
            () => {
              res.status(401).send({ error: 'not authorized' });
            },
          );
        } else {
          res.status(400).send({ error: 'not authorized' });
        }
      },
    );
  }
  return undefined;
};
