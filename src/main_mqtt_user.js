//npm install mqtt --save

var mqtt = require("mqtt");


var client = mqtt.connect({
  clientId: 'SISPOWER_' + Math.random().toString(16).substr(2, 8),
  host: 'iconmqtt.mqtt.iot.gz.baidubce.com',
  port: 1883,
  username: 'iconmqtt/sis1',
  password: 'bRfKrHYBydtYujvS',
  database: 'MqttDB'
});

client.on('connect', function () {
  client.subscribe('ico/Temp', function (err) {
    if (!err) {
      client.publish('ico/Temp', '{"Name":"1","Age":"39"}')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log("Pub to server ：" + message.toString())
  //client.end()
})