import { createControllers } from '../../src/controllers/controllers';
import { Trait } from '../../src/db/models/trait.model';
import { CollectionController } from '../../src/controllers/collection.controller';
import { Character } from '../../src/db/models/character.model';
import { Item } from '../../src/db/models/item.model';
import { Rule } from '../../src/db/models/rule.model';
import { Db, MongoClient } from 'mongodb';
import { openTestDB } from '../helpers/helperFunctions';

describe('Test that the controller creation function works', () => {
  let mongoClient: MongoClient;
  let db: Db;
  beforeAll(async () => {
    mongoClient = await openTestDB();
    db = mongoClient.db();
  });

  afterAll(async () => {
    mongoClient.close();
  });

  let traits: CollectionController<Trait>;
  let items: CollectionController<Item>;
  let rules: CollectionController<Rule>;
  let characters: CollectionController<Character>;

  test('Should create all controllers', async () => {
    const controllers = createControllers(db);
    traits = controllers.traits;
    items = controllers.items;
    rules = controllers.rules;
    characters = controllers.characters;

    expect(traits).toBeTruthy();
    expect(items).toBeTruthy();
    expect(rules).toBeTruthy();
    expect(characters).toBeTruthy();
  });

  // Everything below this point will be moved to it's own file at some point

  describe('Trait controller tests', () => {});

  describe('Item controller tests', () => {
    console.log('asd');
  });

  describe('Rule controller tests', () => {
    console.log('asd');
  });

  describe('Character controller tests', () => {
    console.log('asd');
  });
});
