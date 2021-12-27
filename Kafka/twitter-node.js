var Twitter = require('twit');
const dotenv = require('dotenv');

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);

dotenv.config()


var client = new Twitter({
    consumer_key: 'cTfiaFILeqr5zv5MlpgPSFvyG',
    consumer_secret: 'jfyVxx8xDn4vFgXaOsxdToPUaWbNfwiohSeO6hDzeNlditUp9O',
    access_token: '1393280947957665800-91ZtpMfKbggWzwCFflNpr2cDrl2U8U',
    access_token_secret: 'M0NlPqyhckO043EVPT7ssS54Xr8IbANcRpkLaDRgjqP2G',
});


var stream = client.stream('statuses/filter', {
    track: 'uber'       // trend you want to filter
})



producer.on('ready', function () {

    stream.on('tweet', function (tweet) {

        let message = tweet.text //tweeted text 
        producer.send([
            { topic: 'twitterNode', messages: message, partition: 0 }, // publish to topic twitterNode
            { topic: 'twitterNode', messages: message, partition: 1 },
            { topic: 'twitterNode', messages: message, partition: 2, },
        ], function (err, data) {

            if (err)
                console.log(err);

            console.log(data);
        })
    });
});








