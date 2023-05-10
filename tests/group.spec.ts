import request from 'supertest';
import { expect } from 'chai';
import { app } from '../src/app.js';
import { GroupModel } from '../src/models/group.js';

const testGroup = {
    id: 0,
    name: "Grupo de Prueba",
    members: [0, 1, 2, 3],
    global_stadistics: {
        _weekly_distance: 17,
        _weekly_deviation: 6.21,
        _monthly_distance: 50,
        _monthly_deviation: 18.18,
        _annual_distance: 172,
        _annual_deviation: 57.19
    },
    ranking: [1, 3, 2, 0],
    favorite_tracks: [1, 2],
    group_history: [{
        _id: 0,
        _date: "2021/04/14"
    },
    {
        _id: 1,
        _date: "2022/05/18"
    }]
}

beforeEach(async () => {
    await GroupModel.deleteMany();
    await new GroupModel(testGroup).save();
});

describe('POST /groups', () => {
    it('Should succesfully create a new group', async () => {
        const response = await request(app).post('/groups').send({
            id: 1,
            name: "Ciclistas Canarios",
            members: [1, 3, 7, 12],
            global_stadistics: {
                _weekly_distance: 57,
                _weekly_deviation: 5.18,
                _monthly_distance: 182,
                _monthly_deviation: 12.18,
                _annual_distance: 1428,
                _annual_deviation: 91.27
            },
            ranking: [12, 3, 1, 7],
            favorite_tracks: [6, 19],
            group_history: [{
                _id: 3,
                _date: "2023/02/28"
            },
            {
                _id: 7,
                _date: "2023/03/16"
            }]
        }).expect(201);

        const secondGroup = await GroupModel.findById(response.body._id);
        expect(secondGroup).not.to.be.null;
        expect(secondGroup!.name).to.equal("Ciclistas Canarios");
    });

    it("Should get an error", async () => {
        const response = await request(app).post('/tracks').send(testGroup).expect(500);
    });
});