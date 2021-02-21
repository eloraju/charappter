import joi from 'joi';

console.dir(joi.object({
    test: joi.string().required(),
    num: joi.number().min(10)
}).validate({
    test: "asdf",
    num: 1
}).error, {depth: null});
