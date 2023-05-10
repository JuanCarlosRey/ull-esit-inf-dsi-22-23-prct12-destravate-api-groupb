import request from 'supertest';
import { expect } from 'chai';
import { app } from '../src/app.js';
import { ChallengeModel } from '../src/models/challenge.js';

const testChallenge = {
    id: 0,
    name: "Reto de prueba",
    tracks: [3],
    type: "correr",
    long: 10,
    users: [0, 1]
}

beforeEach(async () => {
    await ChallengeModel.deleteMany();
    await new ChallengeModel(testChallenge).save();
});

describe('POST /challenges', () => {
    it('Should succesfully create a new challenge', async () => {
        const response = await request(app).post('/challenges').send({
            id: 1,
            name: "Reto del Hierro",
            tracks: [6, 7, 8],
            type: "bicicleta",
            long: 57,
            users: [1, 3, 4, 7]
        }).expect(201);

        expect(response.body).to.include({
            id: 1,
            name: "Reto del Hierro",
            type: "bicicleta",
            long: 57,
        });

        const secondChallenge = await ChallengeModel.findById(response.body._id);
        expect(secondChallenge).not.to.be.null;
        expect(secondChallenge!.name).to.equal("Reto del Hierro");
    });

    it("Should get an error", async () => {
        const response = await request(app).post('/challenges').send(testChallenge).expect(500);
    });
});

describe('GET /challenges', () => {
    it('Should get a challenge by its name', async () => {
        await request(app).get('/challenges?name=Reto de prueba').expect(200);
    });

    it('Should get a challenge by its id', async () => {
        await request(app).get('/challenges/0').expect(200);
    });

    it('Should get an error', async () => {
        await request(app).get('/challenges?name=Reto inexistente').expect(404);
    });
});