import express from 'express';
import { ChallengeModel } from '../models/challenge.js';

export const challengeRouter = express.Router();

challengeRouter.post('/challenges', async (req, res) => {
    const challenge = new ChallengeModel(req.body);

    try {
        await challenge.save();
        return res.status(201).send(challenge);
    } catch(error) {
        return res.status(500).send(error);
    }
});

challengeRouter.get('/challenges', async (req, res) => {
    // Código
});

challengeRouter.get('/challenges/:id', async (req, res) => {
    // Código
});

challengeRouter.patch('/challenges', async (req, res) => {
    // Código
});

challengeRouter.patch('/challenges/:id', async (req, res) => {
    // Código
});

challengeRouter.delete('/challenges', async (req, res) => {
    // Código
});

challengeRouter.delete('/challenges/:id', async (req, res) => {
    // Código
});