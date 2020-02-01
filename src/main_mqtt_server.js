var moment = require('moment');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'test'
});
connection.connect();
var userAddSql = 'INSERT INTO home(datetime,temp,humi) VALUES(?,?,?)'; //SQL插入语句格式
var userAddSql_Params = ['2018-7-1', 27.4, 85]; //插入语句字段数据


var mosca = require('mosca');
var MqttServer = new mosca.Server({
    port: 1883
});

MqttServer.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});
MqttServer.on('subscribed', function (topic, client) { //订阅
    console.log('subscribed: ', topic);
});
MqttServer.on('unSubscribed', function (topic, client) { //取消订阅
    console.log('unSubscribed: ', topic);
})


MqttServer.on('clientDisConnected', function (client) {
    console.log('client connected', client.id);
});
/**
 * 监听MQTT主题消息
 **/


MqttServer.on('published', function (packet, client) {
    var topic = packet.topic;
    var qtt = {}; //定义消息（可以为字符串、对象等）
    qtt.topic = 'other';
    qtt.payload = '{"from":1977}';


    switch (topic) {
        case 'HMdata':
            console.log('mqtt-HMdata: ', 'topic =' + topic + ',message = ' + packet.payload.toString());
            //MqttServer.publish({topic: 'other', payload: 'sssss'});
            MqttServer.publish(qtt); //推送一个json对象,这个推送自己也会收到。
            //MqttServer.publish('other',JSON.stringify(qtt),{qos:1, retain: true});
            var data = JSON.parse(packet.payload.toString()); //json解析
            userAddSql_Params[0] = moment().format('YYYY-MM-DD HH:mm:ss'); //数组内容
            userAddSql_Params[1] = data.temp;
            userAddSql_Params[2] = data.humi;


            connection.query(userAddSql, userAddSql_Params, function (err, result) { //sql插入数据
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
            });
            break;
        case 'other':
            console.log('mqtt-other: ', packet.payload.toString());
            break;


    }

});

MqttServer.on('ready', function () {
    console.log('mqtt is running...');
    //MqttServer.authenticate = authenticate;
});