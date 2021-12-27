const Twit = require('twit');
const notifier = require('node-notifier');
const open = require('open');

const apikey = 'cTfiaFILeqr5zv5MlpgPSFvyG'
const apiSecretKey = 'jfyVxx8xDn4vFgXaOsxdToPUaWbNfwiohSeO6hDzeNlditUp9O'
const accessToken = '1393280947957665800-91ZtpMfKbggWzwCFflNpr2cDrl2U8U'
const accessTokenSecret = 'M0NlPqyhckO043EVPT7ssS54Xr8IbANcRpkLaDRgjqP2G'

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});

(async () => {

    // //1. GET RECENT TWEETS
    // T.get('search/tweets', { q: '#uber since:2020-04-15', count: 100 }, 
    // function(err, data, response) {
    //   const tweets = data.statuses
    //   .map(tweet => tweet.text)
    //   // .filter(tweet => tweet.toLowerCase().includes('elon'));
    //   console.log(tweets);
    // })

    // //2. REAL TIME MONITORING USING STREAM (HASHTAG)
    var stream = T.stream('statuses/filter', { track: '#uber' })
    stream.on('tweet', function (tweet) {
        console.log(tweet.text);
        console.log('------');
    })

    // // 3. REAL TIME MONITORING USING STREAM (LOCATION)
    // var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
    // var stream = T.stream('statuses/filter', { locations: sanFrancisco })
    
    // //SHOW NOTIFICATION FOR EACH RECEIVED TWEET
    // stream.on('tweet', function (tweet) {
    //   console.log(tweet.text);
    //   let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

    //   notifier.notify({
    //     title: tweet.user.name,
    //     message: tweet.text
    //   });

    //   notifier.on('click', async function(notifierObject, options, event) {
    //     console.log('clicked');
    //     await open(url);
    //   });
    // })
})();