import DataTypes from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DB from '../db.js';
import UserModel from '../models/user.js';

const User = UserModel(DB, DataTypes);
const expirationTime = 60 * 60 * 24;

const findUser = async (req) => {
  const dbUser = await User.findOne({
    where: {
      username: req.body.user.username,
    },
  });
  if (dbUser) {
    const match = await bcrypt.compare(
      req.body.user.password,
      dbUser.dataValues.passwordHash,
    );
    if (match) {
      const token = jwt.sign(
        {
          id: dbUser.id,
        },
        'lets_play_sum_games_man',
        {
          expiresIn: expirationTime,
        },
      );
      return {
        user: dbUser.id,
        sessionToken: token,
      };
    }
    return null;
  }
  return false;
};

const createUser = async (req) => {
  const hash = bcrypt.hashSync(req.body.user.password, 10);
  try {
    const user = await User.create({
      full_name: req.body.user.full_name,
      username: req.body.user.username,
      passwordHash: hash,
      email: req.body.user.email,
    });
    const token = jwt.sign(
      {
        id: user.id,
      },
      'lets_play_sum_games_man',
      {
        expiresIn: expirationTime,
      },
    );
    const {
      // eslint-disable-next-line camelcase
      full_name,
      username,
      email,
      updatedAt,
      createdAt,
    } = user;
    return {
      full_name,
      username,
      email,
      updatedAt,
      createdAt,
      token,
    };
  } catch (error) {
    return error.message;
  }
};

export { findUser, createUser };
