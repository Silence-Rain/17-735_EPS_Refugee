const request = require('request')
const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({port: 8888})
const baseURL = "http://localhost" // "https://www.silence-rain.com"

wss.on('connection', ws => {
  ws.on('message', message => {
    let msg = JSON.parse(message)

    if (msg.type === "init") {
      let username = msg.data

      // 拉取最新的未读消息
      request(`${baseURL}/api/get_messages/?username=${username}`, (err, response, body) => {
        if (!err && response.statusCode == 200) { 
          res = JSON.parse(body).res

          ws.send(JSON.stringify({
            type: "init",
            data: res
          }))
          console.log(`${username} login`)
        }
      })      
    } else if (msg.type === "message") {
      // 放进数据库
      request({
          url: `${baseURL}/api/new_message/`,
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: msg
        }, (err, response, body) => {
            console.log(err, response.statusCode)
            if (!err && response.statusCode == 200) {
              ws.send(JSON.stringify({
                type: "confirm"
              }))
              console.log(`${username} confirm receive`)

              wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    ...msg,
                    type: "broadcast"
                  }));
                }
              });
            }
        })
    }
  })
})
