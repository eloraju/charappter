import { ObjectId } from 'mongodb';
import { ObjectIdValidator } from '../../../src/db/models/shared';

describe('Shared models tests', () => {
  describe('ObjectId validator tests', () => {
    test('Should fail when provided with a string', () => {
      const result = ObjectIdValidator.validate('12345678901234567890abcd');
      expect(result.error).toBeTruthy();
      // obect is possible undefined br: compiler
      expect((result.error as any).message).toBe(
        'Provided value is not an ObjectId'
      );
    });

    test('Should pass with valid objectI', () => {
      const result = ObjectIdValidator.validate(new ObjectId());
      expect(result.error).toBeFalsy();
    });
  });
});
