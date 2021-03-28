import { Collection, Db, MongoClient } from 'mongodb';
import { Character } from './models/character.model';
import { Item } from './models/item.model';
import { Rule } from './models/rule.model';
import { Trait } from './models/trait.model';

export interface MongoConf {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
}

export interface CharappterCollections {
  traits: Collection<Trait>;
  rules: Collection<Rule>;
  items: Collection<Item>;
  characters: Collection<Character>;
  //    users: Collection<User>;
}

export class DB {
  private static inst: DB = new DB();
  private client: MongoClient | null = null;
  private db: Db | null = null;
  static connected = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static async instance(conf: MongoConf): Promise<DB> {
    if (DB.inst.client) {
      return DB.inst;
    }

    const uri = `mongodb://${conf.user}:${conf.password}@${conf.host}:${conf.port}/${conf.dbName}?`;

    DB.inst.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await DB.inst.client.connect();
    DB.inst.db = DB.inst.client.db();
    DB.connected = DB.inst.client.isConnected();
    return DB.inst;
  }



  static closeDB(): void {
    DB.inst.client?.close();
    DB.connected = !!DB.inst.client?.isConnected();
  }

  private getCollections<T>(collectionName: string): Collection<T> {
    return this.db?.collection<T>(collectionName) as Collection<T>;
  }

  getDatabaseObject(): Db {
    return this.db as Db;
  }

  get traits(): Collection<Trait> {
    return this.getCollections('traits');
  }

  get rules(): Collection<Rule> {
    return this.getCollections<Rule>('rules');
  }

  get characters(): Collection<Character> {
    return this.getCollections<Character>('characters');
  }

  get items(): Collection<Item> {
    return this.getCollections<Item>('items');
  }
  //
  //    get users(): Collection<User>{
  //        return this.getCollections<User>('users');
  //    }

  collections(): CharappterCollections {
    return {
      traits: this.traits,
      rules: this.rules,
      items: this.items,
      characters: this.characters
      //            users : this.users,
    };
  }
}
