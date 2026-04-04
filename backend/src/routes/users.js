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

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                error: "Valid first name, last name, email, and password is required."
            });
        };

        if (first_name.length < 2 || last_name.length < 2) {
            return res.status(400).json({
                error: "A valid first and last name with more than 2 characters is required."
            });
        };
            
        if (!email.includes('@')) {
            return res.status({ error: "A valid email is required." });
        };

        if (password.length < 12) {
            res.status(400).json({
                error: "Password must be of length of more than 12 characters."
            });
        };

        const result = await pool.query(
            `INSERT INTO users (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [first_name, last_name, email, password]
        );

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({
                error: "This email is associated with an existing account."
            });
        };

        console.error('GET /users failed:', error);
        return res.status(500).json({
            error: 'Could not create new user.'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email } = req.body;

        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                error: "Valid first name, last name, and email is required."
            });
        };

        if (first_name.length < 2 || last_name.length < 2) {
            return res.status(400).json({
                error: "A valid first and last name with more than 2 characters is required."
            });
        };
            
        if (!email.includes('@')) {
            return res.status({ error: "A valid email is required." });
        };

        const result = pool.query(
            `UPDATE users
            SET first_name = $1, last_name = $2, email = $3
            WHERE id = $4
            RETURNING *`,
            [first_name, last_name, email, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('PUT /users/:id failed:', error);
        return res.status(500).json({
            error: 'Could not update this user.'
        })
    }
});

export default router;