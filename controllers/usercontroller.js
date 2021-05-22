import express from 'express';
import { createUser, findUser } from '../services/userService.js';

const router = express.Router();

router.route('/signup').post(async (req, res) => {
  const user = await createUser(req);
  if (typeof user === 'object') {
    res.status(200).json(user);
  } else {
    res.status(500).send(user);
  }
});

router.route('/signin').post(async (req, res) => {
  const user = await findUser(req);
  if (user === null) {
    res.status(502).send({
      error: 'Passwords do not match.',
    });
  }
  if (user === false) {
    res.status(403).send({
      error: 'User not found.',
    });
  } else {
    res.json({
      ...user,
      message: 'Successfully authenticated.',
    });
  }
});

export default router;
