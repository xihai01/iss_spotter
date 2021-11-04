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

module.exports = { fetchMyIP };