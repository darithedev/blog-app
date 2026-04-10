import express from 'express'
import usersRouter from './users.js'
import postsRouter from './posts.js'
import textToSpeechRouter from './text-to-speech.js'

const router = express.Router();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/text-to-speech', textToSpeechRouter);

export default router;
