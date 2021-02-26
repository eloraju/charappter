import { Schema } from 'joi';
import { Collection, FilterQuery, ObjectId, OptionalId } from 'mongodb';
import {
  DBDocument,
  ModelValidators,
  ObjectIdValidator
} from '../db/models/shared.model';


export abstract class CollectionController<T extends DBDocument> {
  constructor(
    protected db: Collection,
    protected validators: ModelValidators,
    private controllerName: string
  ) {}

  protected validate(args: Partial<T>|ObjectId, validator: Schema): null | string {
    // This will throw if the validation fails.
    // Not 100% sure whether this is a good idea or not
    const result = validator.validate(args);
    return result.error ? result.error.message : null;
  }

  protected throwError(error: string, message: string): void {
    throw new Error(`[${this.controllerName}] ${error}: ${message}`);
  }

  async create(addArgs: OptionalId<T>): Promise<T> {
    this.validate(addArgs, this.validators.add);

    const newObject = {
      ...addArgs,
      created: Date.now(),
      updated: Date.now(),
      removed: false
    };

    const res = await this.db.insertOne(newObject);

    if (!res.result.ok) {
      this.throwError('BlackMagicError', 'Inserting to database failed.');
    }

    return res.ops[0] as T;
  }

  async delete(id: ObjectId): Promise<boolean> {
    this.validate(id, ObjectIdValidator);
    await this.update({ id }, true);
    return true;
  }

  async update(editArgs: Partial<T>, remove = false): Promise<T> {
    this.validate(editArgs, this.validators.edit);
    const query = {
      _id: new ObjectId(editArgs._id)
    };

    const toUpdate = await this.db.findOne(query);
    if (!toUpdate) {
      this.throwError(
        'ObjectNotFound',
        'Coulnd not find object to update. Does it exists?'
      );
    }

    const updateQuery = {
      $set: {
        ...toUpdate,
        ...editArgs,
        updated: Date.now(),
        removed: remove
      }
    };

    const result = await this.db.updateOne(query, updateQuery);
    if (!result.result.ok) {
      this.throwError(
        'BlackMagicError',
        'For some reason update was not successful.'
      );
    }

    return updateQuery.$set as T;
  }

  async find(id: ObjectId): Promise<T | null> {
    this.validate(id, ObjectIdValidator);
    const query = {
      _id: id
    };

    return await this.db.findOne(query);
  }

  async listAll(): Promise<T[]> {
    return this.db.find({ removed: false }).toArray();
  }
}
