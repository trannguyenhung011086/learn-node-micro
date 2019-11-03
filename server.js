require('dotenv').config();

const micro = require('micro');
const { router, get, post } = require('micro-fork');

const routes = require('./routes');

const Router = router()(
    get('/', routes.home),
    post('/', routes.submit),
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
