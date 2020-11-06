const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body)['ip'];
  return request(`http://ip-api.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(coords) {  
  const result = {};
  result.latitude = JSON.parse(coords)['lat'];
  result.longitude = JSON.parse(coords)['lon'];
  const url = `http://api.open-notify.org/iss-pass.json?lat=${result.latitude}&lon=${result.longitude}&n=5`;
  return request(url);
};

const printPassTimes = function(body) {
  const passTimes = JSON.parse(body)['response'];
  for (let passTime of passTimes) {
    const duration = passTime['duration'];
    const risetime = passTime['risetime'];
    const time  = new Date(risetime * 1000);
    console.log(`Next pass at ${time} for ${duration} seconds!`)
  }
  
};

const nextISSTimesForMyLocation = function() {
  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(printPassTimes)
  .catch((error) => console.log("It didn't work: ", error.message));
};

module.exports = { nextISSTimesForMyLocation };