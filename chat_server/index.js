const request = require('request')
const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({port: 8888})
// Determine backend URL
const baseURL = process.env.NODE_ENV === 'production' ? "https://www.silence-rain.com" : "http://localhost"

wss.on('connection', ws => {
  ws.on('message', message => {
    let msg = JSON.parse(message)

    if (msg.type === "init") {
      // Server init: get the current username
      let username = msg.data

      // Pull all messages for this user
      request(`${baseURL}/api/get_messages/?username=${username}`, (err, response, body) => {
        if (!err && response.statusCode == 200) { 
          res = JSON.parse(body).res

          // Client init: get all messages
          ws.send(JSON.stringify({
            type: "init",
            data: res
          }))
        }
      })      
    } else if (msg.type === "message") {
      // Put the new message into database
      request({
          url: `${baseURL}/api/new_message/`,
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: msg
        }, (err, response, body) => {
            // If successfully putting it into database, send a confirmation back to client
            if (!err && response.statusCode == 200) {
              ws.send(JSON.stringify({
                type: "confirm"
              }))

              // Send the message back to the recipient
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
