var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);


let topicCreated = [{
    topic: 'twitterStream',    //Name of the topic 
    partitions: 3,
    replicationFactor: 1
}]

//create Kafka topic
client.createTopics(topicCreated, (err, result) => {
    if (err)
        console.log(err);
    else
        console.log('Topic created: ', topicCreated[0].topic, result);
    process.exit()
})

//an array of error if there is any error
producer.on('error', function (err) {

    console.log(err);

})