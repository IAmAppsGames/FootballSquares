const koa = require('koa'),
      SERVICE_NAME = process.env.SERVICE_NAME || 'football-squares-dev',
      SESSION_SECRET = process.env.SERVICE_NAME || 'sshhhhhh',
      PORT = process.env.PORT || 8000,
      Router = require('koa-router'),
      Grant = require('grant-koa'),
      logger = require('koa-logger'),
      Boom = require('boom'),
      responseTime = require('koa-response-time'),
      session = require('koa-session'),
      json = require('koa-json'),
      mount = require('koa-mount'),
      app = koa(),
      grant = new Grant(require('./config.json'));

const router = new Router(),
    api = new Router(),
    root = require('./controllers/root'),
    game = require('./controllers/game'),
    square = require('./controllers/square');

router.get('/', root.get);

api.get('/game', game.list);
api.post('/square', square.create);
api.get('/square/:id', square.getById);
api.put('/square/:id', square.update);

router.use('/api', api.routes());
router.use('/api', api.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
}));

app.keys = [SESSION_SECRET];

app.use(responseTime());
app.use(logger());
app.use(session(app))
app.use(mount(grant));
app.use(json({ pretty: false, param: 'pretty' }));
app.use(router.routes(), router.allowedMethods());

app.listen(PORT, () => console.log('%s listening on port %s', SERVICE_NAME, PORT));
