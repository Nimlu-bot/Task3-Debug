var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var DataTypes = require('sequelize');
var User = require('../models/user')(require('../db'), DataTypes); //.import('../models/user');
router.route('/signup').post((req, res) => {
 const hash= bcrypt.hashSync(req.body.user.password, 10);
  User.create({
    full_name: req.body.user.full_name,
    username: req.body.user.username,
    passwordHash: hash,
    email: req.body.user.email,
  }).then(
    function signupSuccess(user) {
      let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({
        user: user,
        token: token,
      });
    },

    function signupFail(err) {
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
        function (err, matches) {
          if (matches) {
            var token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
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
