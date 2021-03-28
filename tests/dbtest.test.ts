import { Db, MongoClient } from 'mongodb';
import { getTestDB } from './helpers/helperFunctions';

describe('should open testdb', () => {
  let client: MongoClient;
  let db: Db;

  beforeAll(async () => {
    client = await getTestDB();
    db = client.db();
  });

  afterAll(async () => await client.close());

  test('should have connection to testdb', () => {
    expect(db).toBeTruthy();
  });
});
