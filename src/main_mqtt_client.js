var mqtt = require('mqtt');
var client = mqtt.connect({
    clientId: 'SISPOWER_' + Math.random().toString(16).substr(2, 8),
    host: 'localhost',
    port: 1883,
    // username: 'iconmqtt/sis1',
    //password: 'bRfKrHYBydtYujvS',
    database: 'MqttDB'
});
var num = 0;
var qtt = {}; //定义消息（可以为字符串、对象等）
qtt.temp = 25.7 + Math.random() * 5;
qtt.humi = 89.1 + Math.random() * 10;
qtt.count = 0;


setInterval(function () { //发布主题为‘ｔｅｓｔ’的消息
    qtt.count++;
    qtt.temp = (25.7 + Math.random() * 5).toFixed(2);
    qtt.humi = (89.1 + Math.random() * 10).toFixed(2); //2位小数
    client.publish('HMdata', JSON.stringify(qtt), {
        qos: 1,
        retain: true
    }); // 'Hello mqtt ' + (num++)
}, 5000);


client.subscribe('HMdata', {
    qos: 1
}); //表示订阅这个HMdata消息。那么服务器推送这个HMdata时，自己才会收到，否则收不到。
client.on('message', function (topic, message) {
    // message is Buffer
    console.log('订阅的消息:' + topic + ',' + message.toString()); //打印消息内容
    //client.end();
});