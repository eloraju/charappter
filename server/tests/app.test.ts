import app from '../src/app';
import request from 'supertest';

describe('Inital tests', ()=>{
    test('GET "/" should return 200', async () => {
        await request(app)
        .get("/")
        .expect(200, "Hi GET!");
    });

    test('POST "/" should return 200', async () => {
        await request(app)
        .post("/")
        .expect(200, "Hi POST!");
    });
})
