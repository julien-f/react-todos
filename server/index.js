const Koa = require('koa'),
  websockify = require('koa-websocket');

const app = websockify(new Koa());
let todos = new (require('immutable')).Map()

app.use(require('koa-body')())

app.ws.use((ctx, next) =>{

    ctx.websocket.on('message', function (data) {

      todo = JSON.parse(data);
      console.log(todo.data);
      if(todo.data === "send me data"){
        console.log(todo.data);
        ctx.websocket.send(JSON.stringify(todos));
      } else if(todo.data === "Delete data"){
        console.log(todo.id)
        todos = todos.delete(todo.id)
        ctx.websocket.send(JSON.stringify(todos));
      } else{
        let { id } = todo
        console.log(id);
        console.log(todo);
        todos = todos.set(id, todo)
        console.log(todos);
        ctx.websocket.send(JSON.stringify(todos));
      }
  });
});

    //ctx.websocket.on('open', function(event) {
      //ctx.websocket.send(JSON.stringify(todos));
  // });

app.use(require('koa-static')(`${__dirname}/../pages/build`));

/*
io.sockets.on('connection', function(socket){

  console.log('a user connected');
  socket.send("Welcome !");
  socket.on('message',function(data){console.log('received'); });
});
*/

app.listen(3000, function (error) {
  if (error != null) {
    console.error(error)
  }

  const { address, port } = this.address()
  console.log('http://[%s]:%s', address, port)
})
