const kafka = require('kafka-node');
const express = require('express');
const port = 3000;
const app = express();

var options = {

    kafkaHost: '127.0.0.1:9092',
    groupId: "twitterStreamPartitions",
    autoCommit: false
};

var consumerGroup = new kafka.ConsumerGroup(options, "twitterStream");

const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
});
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', client => {
    console.log('Connected', client);

    consumerGroup.on('message', function (message) {
        client.send(message)
    });

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
});