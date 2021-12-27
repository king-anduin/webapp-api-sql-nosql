var kafka = require('kafka-node');

var options = {

    kafkaHost: '127.0.0.1:9092',
    groupId: "my_first_app",
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    sessionTimeout: 15000,
    fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
    protocol: ['roundrobin'],
    fromOffset: 'latest',
    outOfRangeOffset: 'earliest'
};


var consumerGroup = new kafka.ConsumerGroup(options, "twitterNode");


consumerGroup.on('message', function (message) {
    console.log('Message: ' + message.value);

});

consumerGroup.on('error', function onError(error) {
    console.error(error);
});

console.log('Started consuming the topic');