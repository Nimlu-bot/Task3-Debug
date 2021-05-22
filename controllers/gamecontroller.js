import express from 'express';
import {
  findAll,
  findOne,
  create,
  update,
  destroy,
} from '../services/gameService.js';

const router = express.Router();

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
});

export default router;
