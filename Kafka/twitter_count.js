// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');

const dotenv = require('dotenv');

var kafka = require('kafka-node')

dotenv.config()

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
// eslint-disable-next-line no-use-before-define
const token = 'AAAAAAAAAAAAAAAAAAAAAPSWPgEAAAAAuU8Zcq7%2B%2FySsfMgevqnsjNL0PfQ%3DSqvnQ3rVINEEPifD03MPVbduT73QadS2gzV1m0XRLRdYEMgNdw';

const endpointUrl = "https://api.twitter.com/2/tweets/counts/recent";
async function getRequest(index) {
    // Edit query parameters below and specify a search query
    // optional params: start_time,end_time,since_id,until_id,next_token,granularity
    const params = [{
        'query': '#uber',
        'granularity': 'day'
    },
    {
        'query': '#lyft',
        'granularity': 'day'
    },
    {
        'query': '#taxi',
        'granularity': 'day'
    }]
    const res = await needle('get', endpointUrl, params[index], {
        headers: {
            "User-Agent": "v2RecentTweetCountsJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}
(async () => {

    for (let i = 0; i < 3; i++) {
        try {
            // Make request

            const response = await getRequest(i);

            const Producer = kafka.Producer;
            const client = new kafka.KafkaClient();
            const producer = new Producer(client);
            const kafka_topic = 'twitterCount';
            const kafka_value = [
                {
                    'Uber':
                        response.meta
                },
                {
                    'Lyft':
                        response.meta
                },
                {
                    'Taxi':
                        response.meta
                }
            ]

            let payloads = [
                {
                    topic: kafka_topic,
                    messages: JSON.stringify(kafka_value[i])
                }
            ];

            producer.on('ready', async function () {
                let push_status = producer.send(payloads, (err, data) => {
                    if (err) {
                        console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed');
                    } else {
                        console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success');
                        if (i > 1) {
                            process.exit()
                        }
                    }
                });
            });

            producer.on('error', function (err) {
                console.log(err);
                console.log('[kafka-producer -> ' + kafka_topic + ']: connection errored');
                throw err;
            });

            console.dir(response, {
                depth: null
            });

        } catch (e) {
            console.log(e);
            process.exit(-1);
        }
    }
})();

