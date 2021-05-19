const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataTypes = require('sequelize');
const DB = require('../db');
const UserModel = require('../models/user');

const User = UserModel(DB, DataTypes);
router.route('/signup').post((req, res) => {
  const hash = bcrypt.hashSync(req.body.user.password, 10);
  User.create({
    full_name: req.body.user.full_name,
    username: req.body.user.username,
    passwordHash: hash,
    email: req.body.user.email,
  }).then(
    (user) => {
      const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({
        user,
        token,
      });
    },

    (err) => {
      res.status(500).send(err.message);
    },
  );
});

router.route('/signin').post((req, res) => {
  User.findOne({ where: { username: req.body.user.username } }).then((user) => {
    if (user) {
      bcrypt.compare(
        req.body.user.password,
        user.passwordHash,
        (_err, matches) => {
          if (matches) {
            const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user,
              message: 'Successfully authenticated.',
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: 'Passwords do not match.' });
          }
        },
      );
    } else {
      res.status(403).send({ error: 'User not found.' });
    }
  });
});

module.exports = router;
