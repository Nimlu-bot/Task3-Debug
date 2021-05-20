import express from 'express';
// import DataTypes from 'sequelize';
// import DB from '../db.js';
// import GameModel from '../models/game.js';
import {
  findAll,
  findOne,
  create,
  update,
  destroy,
} from '../services/gameService.js';

const router = express.Router();
// const Game = GameModel(DB, DataTypes);

router.get('/all', async (req, res) => {
  const data = await findAll(req);
  if (data.length === 0) {
    res.status(500).json({
      message: 'Data not found',
    });
  } else {
    res.status(200).json({
      games: data,
      message: 'Data fetched.',
    });
  }
  // Game.findAll({ where: { owner_id: req.user.id } }).then(
  //   (data) => {
  //     res.status(200).json({
  //       games: data,
  //       message: 'Data fetched.',
  //     });
  //   },
  //   () => {
  //     res.status(500).json({
  //       message: 'Data not found',
  //     });
  //   },
  // );
});

router.get('/:id', async (req, res) => {
  const game = await findOne(req);
  if (!game) {
    res.status(500).json({
      message: 'Data not found',
    });
  } else {
    res.status(200).json({
      game,
    });
  }
  // Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } }).then(
  //   (game) => {
  //     res.status(200).json({
  //       game,
  //     });
  //   },

  //   () => {
  //     res.status(500).json({
  //       message: 'Data not found.',
  //     });
  //   },
  // );
});

router.post('/create', async (req, res) => {
  const game = await create(req);
  if (typeof game === 'object') {
    res.status(200).json({
      game,
      message: 'Game created.',
    });
  } else {
    res.status(404).send('not found');
  }
  // Game.create({
  //   title: req.body.game.title,
  //   owner_id: req.body.user.id,
  //   studio: req.body.game.studio,
  //   esrb_rating: req.body.game.esrb_rating,
  //   user_rating: req.body.game.user_rating,
  //   have_played: req.body.game.have_played,
  // }).then(
  //   (game) => {
  //     res.status(200).json({
  //       game,
  //       message: 'Game created.',
  //     });
  //   },

  //   (err) => {
  //     res.status(500).send(err.message);
  //   },
  // );
});

router.put('/update/:id', async (req, res) => {
  const game = await update(req);
  if (typeof game === 'object') {
    res.status(200).json({
      message: 'Successfully updated.',
    });
  } else {
    res.status(404).send('not found');
  }
  // Game.update(
  //   {
  //     title: req.body.game.title,
  //     studio: req.body.game.studio,
  //     esrb_rating: req.body.game.esrb_rating,
  //     user_rating: req.body.game.user_rating,
  //     have_played: req.body.game.have_played,
  //   },
  //   {
  //     where: {
  //       id: req.params.id,
  //       owner_id: req.body.user.id,
  //     },
  //   },
  // ).then(
  //   (game) => {
  //     res.status(200).json({
  //       game,
  //       message: 'Successfully updated.',
  //     });
  //   },

  //   (err) => {
  //     res.status(500).json({
  //       message: err.message,
  //     });
  //   },
  // );
});

router.delete('/remove/:id', async (req, res) => {
  const game = await destroy(req);
  if (game) {
    res.status(200).json({
      message: 'Successfully deleted',
    });
  } else {
    res.status(404).send('not found');
  }
  // Game.destroy({
  //   where: {
  //     id: req.params.id,
  //     owner_id: req.user.id,
  //   },
  // }).then(
  //   (game) => {
  //     res.status(200).json({
  //       game,
  //       message: 'Successfully deleted',
  //     });
  //   },

  //   (err) => {
  //     res.status(500).json({
  //       error: err.message,
  //     });
  //   },
  // );
});

export default router;
