/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGitHubProfileAsync = require('./promisification.js').getGitHubProfileAsync;
var pluckFirstLineFromFileAsync = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;
var fsPromises = require('fs').promises;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  var username;
  return pluckFirstLineFromFileAsync(readFilePath).
    then(function(username) {
      return getGitHubProfileAsync(username);
    }).
    then(function (fileToWrite) {
      fileToWrite = JSON.stringify(fileToWrite);
      return fsPromises.writeFile(writeFilePath, fileToWrite);
    }).
    catch(err => {
      throw new Error(err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
