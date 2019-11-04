require('dotenv').config();

const micro = require('micro');
const { router, get, post } = require('micro-fork');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection
    .on('connected', () =>
        console.log(`Mongoose connection open on ${process.env.DATABASE}`),
    )
    .on('error', e => {
        console.log(`Connection error: ${e.message}`);
    });

const routes = require('./routes');

const Router = router()(
    get('/', routes.home),
    post('/', routes.submit),
    get('/registrations', routes.registrations),
    get('*', routes.notFound),
);

const app = micro(Router);

if (!process.env.IS_NOW) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Micro is serving at ${port}`);
    });
}

module.exports = app;
