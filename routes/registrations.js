const micro = require('micro');
const pug = require('pug');

const Models = require('../models');

const registrations = async (req, res) => {
    const registrations = await Models.Registration.find();
    micro.send(
        res,
        200,
        await Promise.resolve(
            pug.renderFile('views/registrations.pug', {
                title: 'Registration List',
                registrations,
            }),
        ),
    );
};

module.exports = registrations;
