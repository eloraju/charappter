import {ObjectIdValidator} from '../../../src/db/models/shared';

describe('Shared models tests', () => {
    describe('ObjectId validator tests', () =>{
        const invalidID_length = '1a2b3c4d5e';
        const invalidID_character = '12345678901234567890123_';
        
        const validID = '000000000000000000000000';

        test('Should fail with too short ObjectId', ()=>{
            const result = ObjectIdValidator.validate(invalidID_length);
            expect(result.error).toBeTruthy();
        });

        test('Should fail with invalid character', ()=>{
            const result = ObjectIdValidator.validate(invalidID_character);
            expect(result.error).toBeTruthy();
        });

        test('Should pass with valid objectI', ()=>{
            const result = ObjectIdValidator.validate(validID);
            expect(result.error).toBeFalsy();
        });
    });
});
