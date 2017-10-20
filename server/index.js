const { PassThrough } = require('stream')

const app = new (require('koa'))()

app.use(require('@koa/cors')())

app.use(require('koa-body')())

let todos = new (require('immutable')).Map()
const RE = new RegExp('/todos(?:/(.+))?')
app.use(async (ctx, next) => {
  const matches = RE.exec(ctx.url)
  if (matches === null) {
    return next()
  }

  const id = matches[1]
  const { method } = ctx
  if (method === 'GET') {
    if (id === undefined) {
      const out = new PassThrough()
      ctx.set('content-type', 'application/x-ndjson')
      ctx.body = out

      todos.forEach(todo => {
        out.write(JSON.stringify(todo))
        out.write('\n')
      })
      out.end()
    } else {
      ctx.body = todos.get(id)
    }
  } else if (method === 'PUT' && id !== undefined) {
    const todo = {
      ...ctx.request.body,
      id
    }
    todos = todos.set(id, todo)
    ctx.body = 'ok'
  }
})

app.use(require('koa-static')(`${__dirname}/../pages/build`))

app.listen(20431, function(error) {
  if (error != null) {
    return console.error(error)
  }

  const { address, port } = this.address()
  console.log('http://[%s]:%s', address, port)
})
