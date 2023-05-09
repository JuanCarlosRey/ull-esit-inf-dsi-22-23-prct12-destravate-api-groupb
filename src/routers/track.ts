import express from 'express';
import { TrackModel } from '../models/track.js';

export const trackRouter = express.Router();

trackRouter.post('/tracks', async (req, res) => {
    const track = new TrackModel(req.body);

    try {
        await track.save();
        return res.status(201).send(track);
    } catch(error) {
        return res.status(500).send(error);
    }
});

trackRouter.get('/tracks', async (req, res) => {
    // Código
});

trackRouter.get('/tracks/:id', async (req, res) => {
    // Código
});

trackRouter.patch('/tracks', async (req, res) => {
    // Código
});

trackRouter.patch('/tracks/:id', async (req, res) => {
    // Código
});

trackRouter.delete('/tracks', async (req, res) => {
    // Código
});

trackRouter.delete('/tracks/:id', async (req, res) => {
    // Código
});