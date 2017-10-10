const Koa = require('koa'),
  websockify = require('koa-websocket');

const app = websockify(new Koa());
let todos = new (require('immutable')).Map()

app.use(require('koa-body')())

app.ws.use((ctx, next) =>{
    ctx.websocket.send(JSON.stringify(todos));

    ctx.websocket.on('message', function (data) {
      let msg = JSON.parse(data);
      if(msg.action === "delete"){
        const { id } = msg
        todos = todos.delete(id)
        ctx.websocket.send(JSON.stringify(todos));
      } else if(msg.action === "set"){
        let { todo } = msg
        let { id } = todo
        todos = todos.set(id, todo)
        ctx.websocket.send(JSON.stringify(todos));
      }
  });
});

app.use(require('koa-static')(`${__dirname}/../pages/build`));

app.listen(3000, function (error) {
  if (error != null) {
    console.error(error)
  }

  const { address, port } = this.address()
  console.log('http://[%s]:%s', address, port)
})
