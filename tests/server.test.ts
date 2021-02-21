import app from '../src/app'

const mockListen = jest.fn();
app.listen = mockListen;

describe('Intial tests', () => {
    test('Server starts to listen for requests', async () => {
        await require('../src/server');
        expect(mockListen.mock.calls.length).toBe(1);
        expect(mockListen.mock.calls[0][0]).toBe(1339);
        expect(app.locals.db).toBeTruthy();
    });
})

