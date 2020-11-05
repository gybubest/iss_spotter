const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, data);
      });
    });
  });
};

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    const code = response['statusCode'];
    const ip = JSON.parse(body)['ip'];

    if (error) {
      callback(error, null);
      return;
    } else if (code !== 200) {
      const msg = `Status Code ${code} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    const code = response.statusCode;
    const result = {};
    result.latitude = JSON.parse(body)['lat'];
    result.longitude = JSON.parse(body)['lon'];

    if (error) {
      callback(error, null);
      return;
    } else if (code !== 200) {
      const msg = `Status Code ${code} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, result);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}&n=5`, (error, response, body) => {
    const code = response['statusCode'];
    const result = JSON.parse(body)['response'];

    if (error) {
      callback(error, null);
      return;
    } else if (code !== 200) {
      const msg = `Status Code ${code} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, result);
    }
  });
};

module.exports = { nextISSTimesForMyLocation };