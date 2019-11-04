const micro = require('micro');
const pug = require('pug');

const home = (req, res) => {
    micro.send(
        res,
        200,
        pug.renderFile('views/form.pug', { title: 'Registration Form' }),
    );
};

module.exports = {
    home: home,
    submit: require('./submit'),
    notFound: require('./notFound'),
    registrations: require('./registrations'),
};
