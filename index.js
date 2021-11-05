//import functions
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    fetchISSFlyOverTimes(data, (error, data) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log(data);
    });
    console.log(data);
  });
  console.log('Returned IP: ', ip);
});