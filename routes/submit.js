const micro = require('micro');
const pug = require('pug');
const parse = require('urlencoded-body-parser');
const yup = require('yup');

const Models = require('../models');

const validator = input =>
    yup
        .object()
        .shape({
            email: yup
                .string()
                .email()
                .required(),
            name: yup.string().required(),
        })
        .validate(input, { abortEarly: false });

const submit = async (req, res) => {
    const body = await parse(req);

    try {
        await validator(body);
    } catch (e) {
        console.log(e.value);
        micro.send(
            res,
            502,
            pug.renderFile('views/form.pug', {
                title: 'Registration Form',
                errors: e.errors,
                data: body,
            }),
        );
        return;
    }

    await Models.Registration.create(body);
    const cursor = Models.Registration.find()
        .sort({ name: 1 })
        .cursor();
    for (
        let doc = await cursor.next();
        doc != null;
        doc = await cursor.next()
    ) {
        console.log(doc);
    }
    micro.send(res, 200, 'Registered successfully!');
};

module.exports = submit;
