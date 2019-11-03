const micro = require('micro');

const notFound = (req, res) => {
    micro.send(res, 404, 'Page not found!');
};

module.exports = notFound;
