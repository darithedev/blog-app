import express from 'express'

const router = express.Router();

router.use('/', router);

export default router;
