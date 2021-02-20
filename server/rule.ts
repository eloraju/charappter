import {DBDocument} from './shared';
import joi from 'joi';

export interface Rule extends DBDocument{
    target: string;
    source: string;
    multiplier: number;
    function?: string;
}

export const RuleValidator = joi.object({

});

