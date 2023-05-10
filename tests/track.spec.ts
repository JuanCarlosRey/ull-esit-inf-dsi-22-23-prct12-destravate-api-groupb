import request from 'supertest';
import { expect } from 'chai';
import { app } from '../src/app.js';
import { TrackModel } from '../src/models/track.js';

const testTrack = {
    id: 0,
    name: "Ruta de prueba",
    start: {
        lat: 0,
        long: 0,
        alt: 0
    },
    end: {
        lat: 1,
        long: 1,
        alt: 1
    },
    long: 10,
    grade: 1.7,
    users: [0, 1],
    type: "correr",
    puntuation: 4.3
}

beforeEach(async () => {
    await TrackModel.deleteMany();
    await new TrackModel(testTrack).save();
});

describe('POST /tracks', () => {
    it('Should succesfully create a new track', async () => {
        const response = await request(app).post('/tracks').send({
            id: 1,
            name: "Ruta del Teide",
            start: {
                lat: 25,
                long: 18,
                alt: 7
            },
            end: {
                lat: 30,
                long: 19,
                alt: 11
            },
            long: 26,
            grade: 18.5,
            users: [2, 3],
            type: "correr",
            puntuation: 4.8
        }).expect(201);

        expect(response.body).to.include({
            id: 1,
            name: "Ruta del Teide",
            long: 26,
            grade: 18.5,
            type: "correr",
            puntuation: 4.8
        });

        const secondTrack = await TrackModel.findById(response.body._id);
        expect(secondTrack).not.to.be.null;
        expect(secondTrack!.name).to.equal("Ruta del Teide");
    });

    it("Should get an error", async () => {
        const response = await request(app).post('/tracks').send(testTrack).expect(500);
    });
});
