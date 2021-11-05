const { nextISSTimesForMyLocation } = require('./iss_promised');
const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

nextISSTimesForMyLocation((data) => {
    //success, do some time parsing
    for (const pass of data) {
      //get unix time stamp in miliseconds
      let milsec = pass.risetime * 1000;
      //create new date object
      let risetime = new Date(milsec);
      let date = risetime.toLocaleDateString('en-US', options);
      let time = risetime.toLocaleTimeString('en-US');
      console.log('Next pass at ' + date + ' ' + time + ' for ' + pass.duration + ' seconds!');
    }
});
/* fetchMyIP().then((data) => {
  //parse data into JSON object
  data = JSON.parse(data);
  return fetchCoordsByIP(data.ip);
}).then((data) => {
  let { latitude, longitude } = JSON.parse(data);
  return fetchISSFlyOverTimes({ latitude, longitude });
}).then((data) => {
  console.log(data);
}); */