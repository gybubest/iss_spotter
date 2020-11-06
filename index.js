const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(pass.risetime * 1000);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});