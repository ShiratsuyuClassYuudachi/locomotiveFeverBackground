const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const path = require('path')

const index = require('./routes/index')
const users = require('./routes/users')
const image = require('./routes/image')

// error handler
onerror(app)

// middlewares
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir:path.join(__dirname,'public/upload'),
    keepExtensions: true,
    hash: 'md5',
    maxFileSize: 200 * 1024 * 1024
  }
}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(image.routes(),image.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
