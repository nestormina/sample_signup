import express from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = jwt.sign({ email: user.email }, 'shhhhh');

    res.status(201).json({ user: user._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ email: user.email }, 'shhhhh');

    res.status(200).json({ user: user._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

export default router;
