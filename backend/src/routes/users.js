import express from 'express'
import pool from '../db/pools.js'

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const result = await pool.query(`SELECT * FROM users`);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('/GET users failed:', error);
        return res.status(500).json({
            error: 'Could not get list of users.'
        });
    }
});

export default router;