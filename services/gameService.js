import DataTypes from 'sequelize';
import DB from '../db.js';
import GameModel from '../models/game.js';

const Game = GameModel(DB, DataTypes);

const findAll = async (req) => {
  const data = await Game.findAll({
    where: {
      owner_id: req.user.id,
    },
  });
  return data;
};

const findOne = async (req) => {
  const data = await Game.findOne({
    where: {
      id: req.params.id,
      owner_id: req.user.id,
    },
  });
  return data;
};
const create = async (req) => {
  try {
    const game = await Game.create({
      title: req.body.game.title,
      owner_id: req.user.id,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played,
    });
    return game;
  } catch (error) {
    return error.message;
  }
};

const update = async (req) => {
  try {
    const game = await Game.update(
      {
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
      },
      {
        where: {
          id: req.params.id,
          owner_id: req.user.id,
        },
      },
    );
    return game;
  } catch (error) {
    return error.message;
  }
};

const destroy = async (req) => {
  try {
    const game = await Game.destroy({
      where: {
        id: req.params.id,
        owner_id: req.user.id,
      },
    });
    return game;
  } catch (error) {
    return error.message;
  }
};
export { findAll, findOne, create, update, destroy };
