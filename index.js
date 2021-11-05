//import functions
const { nextISSTimesForMyLocation } = require('./iss');
const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  //success, do some time parsing
  for (const pass of passTimes) {
    //get unix time stamp in miliseconds
    let milsec = pass.risetime * 1000;
    //create new date object
    let risetime = new Date(milsec);
    let date = risetime.toLocaleDateString('en-US', options);
    let time = risetime.toLocaleTimeString('en-US');
    console.log('Next pass at ' + date + ' ' + time + ' for ' + pass.duration + ' seconds!');
  }
});