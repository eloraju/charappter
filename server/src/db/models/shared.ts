import joi from 'joi'

export const objectIdValidator = joi.string().regex(/^[a-f0-9]{24}$/)

export interface DBDocument {
    _id: string;
}
