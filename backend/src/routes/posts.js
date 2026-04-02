import express from 'express'
import pool from '../db/pools/js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * from posts ORDER BY created_at DESC`
        );

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('GET /posts failed:', error);
        return res.status(500).json({
            error: 'Error! Could not get all posts.'
        });
    }
});

export default router;
