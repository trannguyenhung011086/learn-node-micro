const micro = require('micro');
const pug = require('pug');
const parse = require('urlencoded-body-parser');
const yup = require('yup');

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
    micro.send(res, 200, 'Registered successfully!');
};

module.exports = submit;
