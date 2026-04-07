import express from 'express'
import pool from '../db/pools.js'

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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({error: 'Invalid post id.'});
        }

        const result = await pool.query(
            `SELECT * FROM posts WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'This post does not exist.'
            });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('GET /posts/:id failed:', error);
        return res.status(500).json({
            error: 'Error! Could not get individual post.'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, text, tags } = req.body;

        if (!title || !text) {
            return res.status(400).json({error: 'Title and text are required fields.'});
        };

        const result = await pool.query(
            `INSERT INTO posts (title, description, text, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [title, description, text, tags]
        );
        
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('POST /posts failed:', error);
        return res.status(500).json({
            error: 'Error! Could not create new post.'
        });
    }
});

router.put('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { title, description, text, tags, user_id} = req.body;

        if (isNaN(user_id) || isNaN(id)) {
            return res.status(400).json({error: 'Invalid post id or user id.'});
        };

        if (!title || !text) {
            return res.status(400).json({error: 'Title and text are required fields.'});
        };

        const result = await pool.query(
            `UPDATE posts 
            SET title = $1, description = $2, text = $3, tags = $4
            WHERE user_id = $5 AND id = $6
            RETURNING *`,
            [title, description, text, tags, user_id, id]
        );
        
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('PUT /posts/:id failed:', error);
        return res.status(500).json({
            error: 'Error! Could not update post.'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Must have a valid id.' });
        };

        const result = await pool.query(
            `DELETE FROM posts WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post was not found.' });
        };

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('DELETE /posts/:id failed:', error);
        return res.status(500).json({
            error: 'Could not delete this post.'
        });
    }
});

export default router;
