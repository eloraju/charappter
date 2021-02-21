import {DBDocument, ObjectIdValidator} from './shared';
import joi from 'joi';

export interface Rule extends DBDocument{
    _id: string;
    target: string;
    source: string;
    multiplier: number;
    function?: string|null;
}

export const RuleValidator = joi.object({
    _id: ObjectIdValidator.required(),
    target: ObjectIdValidator.required(),
    source: ObjectIdValidator.required(),
    multiplier: joi.number().strict(true),
    function: joi.string().allow(null)
});

