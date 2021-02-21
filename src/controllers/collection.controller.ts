import {Schema} from 'joi'
import {Collection, ObjectId, OptionalId} from 'mongodb'
import {DBDocument, ObjectIdValidator} from '../db/models/shared';

export abstract class CollectionController<T extends DBDocument> {
    constructor (
        protected db: Collection<T>, 
        private addValidator: Schema,
        private editValidator: Schema,
        private controllerName: string
    ) {}

    private validate(args: any, validator: Schema) {
        // This will throw if the validation fails.
        // Not 100% sure whether this is a good idea or not
        const res = validator.validate(args);
        if (res.error) {
            this.throwError('InvalidArgumentsError', res.error.message)
        }
    }

    private throwError(error: string, message: string) {
        throw new Error(`[${this.controllerName}] ${error}: ${message}`);
    }

    async add(addArgs: OptionalId<T>): Promise<T> {
        this.validate(addArgs, this.addValidator);

        const newObject = {
            ...addArgs,
            created: Date.now(),
            updated: Date.now(),
            removed: false
        }

        const res = await this.db.insertOne(newObject);

        if (!res.result.ok) {this.throwError('BlackMagicError', 'Inserting to database failed.')}

        return res.ops[0] as T;
    }

    async remove(_id: ObjectId): Promise<boolean> {
        this.validate(_id, ObjectIdValidator);
        await this.edit({_id} as any, true);
        return true;
    }

    async edit(editArgs: Partial<T>, remove: boolean = false): Promise<T> {
        this.validate(editArgs, this.editValidator);
        const query:any = {
            _id: new ObjectId(editArgs._id)
        };

        const toUpdate = await this.db.findOne(query);
        if (!toUpdate) { this.throwError('ObjectNotFound', 'Coulnd not find object to update. Does it exists?') };

        const updateQuery = {
            $set:{
                ...toUpdate,
                ...editArgs,
                updated: Date.now(),
                removed: remove
            }
        };

        const result = await this.db.updateOne(query,updateQuery);
        if (!result.result.ok) { this.throwError('BlackMagicError', 'For some reason update was not successful.')}

        return updateQuery.$set as T;
    }

    async view(id: ObjectId): Promise<T>{
        this.validate(id, ObjectIdValidator);
        const query: any = {
            _id: id,
        }
        const result = await this.db.findOne(query);
        if (!result) { this.throwError('ObjectNotFound', 'Object does not exist')}
        return result as T;
    }

    async all(): Promise<T[]>{
        return this.db.find({removed: false} as any).toArray();
    }
}
