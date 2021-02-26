import { DBDocument, ModelValidators, ObjectIdValidator } from './shared.model';
import joi from 'joi';

export interface Item extends DBDocument {
  name: string;
  description: string;
}

export const ItemValidator = joi.object({
  _id: ObjectIdValidator.required(),
  name: joi.string().required(),
  description: joi.string().allow(null)
});

export const AddItemValidator = joi.object({
  name: joi.string().required(),
  description: joi.string().allow(null)
});

export const EditItemValidator = joi.object({
  _id: ObjectIdValidator.required(),
  name: joi.string(),
  description: joi.string().allow(null)
});

export const ItemValidators: ModelValidators = {
  main: ItemValidator,
  add: AddItemValidator,
  edit: EditItemValidator
};
