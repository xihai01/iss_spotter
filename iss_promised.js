const request = require('request-promise-native');
const IP = 'https://api.ipify.org?format=json';
const GEO_COORDS = 'https://freegeoip.app/json/';

const fetchMyIP = function() {
  return request(IP);
};

const fetchCoordsByIP = function(body) {
  return request(GEO_COORDS + body);
};

const fetchISSFlyOverTimes = function(body) {
  return request(`https://iss-pass.herokuapp.com/json/?lat=${body.latitude}&lon=${body.longitude}`);
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP().then((data) => {
    //parse data into JSON object
    data = JSON.parse(data);
    return fetchCoordsByIP(data.ip);
  }).then((data) => {
    let { latitude, longitude } = JSON.parse(data);
    return fetchISSFlyOverTimes({ latitude, longitude });
  }).then((data) => {
    data = JSON.parse(data).response;
    return callback(data);
  }).catch((error) => {
    console.log("It didn't work: ", error.message);
  });
};

module.exports = { nextISSTimesForMyLocation };