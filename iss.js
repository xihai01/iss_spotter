/**
 * Makes a single API request to retrieve the user's IP address
 * Input:
 *  - A callback (to pass back an error or the IP string)
 * Returns (via callback):
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const IP = 'https://api.ipify.org?format=json';
const GEO_COORDS = 'https://freegeoip.app/json/';

const fetchMyIP = function(callback) {
  //use request to fetch IP address from JSON API
  request(IP, (error, response, body) => {
    //error can be set if invalid domain, user is offline ..ect
    if (error) {
      callback(error, null);
      return;
    }
    //if a non-200 status, assume a server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //successfully retrieved IP
    let ipAdd = JSON.parse(body);
    callback(error, ipAdd.ip);
  });
};

//fetch coords from IP
const fetchCoordsByIP = function(ip, callback) {
  //use request to fetch geo coords from JSON API
  request(GEO_COORDS + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //if a non-200 status code, assume an error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    //parse data in JSON format
    let { latitude, longitude } = JSON.parse(body);
    //pass lon/lat info via callback
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  //use request to fetch ISS flyover data given an object of coords
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS flyover data: ${body}`), null);
      return;
    }
    //parse JSON data
    let data = JSON.parse(body).response;
    callback(null, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };