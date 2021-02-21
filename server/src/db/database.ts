import {Collection, Db, MongoClient} from 'mongodb';
import {Rule} from './models/rule';
import {Trait} from './models/trait';

export interface MongoConf {
    host: string;
    port: number;
    user: string;
    password: string;
    dbName: string;
}


export class DB {
    private static inst: DB = new DB();
    private client: MongoClient|null = null;
    private db: Db|null = null;
    static connected = false;

    private constructor() {}

    static async instance(conf: MongoConf): Promise<DB> {
        if (DB.inst.client) { return DB.inst }

        const uri = `mongodb://${conf.user}:${conf.password}@${conf.host}:${conf.port}/${conf.dbName}?`;
        
        DB.inst.client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        await DB.inst.client.connect();
        DB.inst.db = DB.inst.client.db()
        DB.connected = DB.inst.client.isConnected()
        return DB.inst;
    }

    static closeDB() {
        DB.inst.client?.close();
        DB.connected = !!DB.inst.client?.isConnected();
    }


    private getCollections<T>(collectionName: string): Collection<T> {
        return (this.db?.collection<T>(collectionName) as Collection<T>);
    }

    get traits(): Collection<Trait> | null {
        return this.getCollections('traits');
    }

    get rules(): Collection<Rule> | null {
        return this.getCollections<Rule>('rules');
    }

    async testCall(): Promise<any> {
        console.log(this.client?.isConnected())
        return await this.db?.listCollections().next();
    }

}
