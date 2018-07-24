'use strict';

const glob  = require('glob');
const path  = require('path');
const _     = require('lodash');

const getGlobbedPaths = function (globPatterns, excludes) {
    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
  
    // The output array
    var output = [];
  
    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
      globPatterns.forEach(function (globPattern) {
        output = _.union(output, getGlobbedPaths(globPattern, excludes));
      });
    } else if (_.isString(globPatterns)) {
      if (urlRegex.test(globPatterns)) {
        output.push(globPatterns);
      } else {
        var files = glob.sync(globPatterns);
        if (excludes) {
          files = files.map(function (file) {
            if (_.isArray(excludes)) {
              for (var i in excludes) {
                if (excludes.hasOwnProperty(i)) {
                  file = file.replace(excludes[i], '');
                }
              }
            } else {
              file = file.replace(excludes, '');
            }
            return file;
          });
        }
        output = _.union(output, files);
      }
    }
  
    return output;
  };

  module.exports = {
    app: {
        title: 'BCDevExchange - The BC Developer\'s Exchange',
        description: 'Better ways for government and developers to work together',
        domain: process.env.DOMAIN || 'http://localhost:3000'
    },
    api: {
        secure: false,
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || '3000'
    },
    logo: 'modules/core/img/brand/logo.png',
    favicon: 'modules/core/img/brand/favicon.ico',
    sessionTimeout: process.env.SESSION_TIMEOUT || 300,
    sessionTimeoutWarning: process.env.SESSION_WARNING || 300,
    port: process.env.PORT || 4000,
    host: process.env.HOST || '0.0.0.0',
    folders: getGlobbedPaths(path.join(process.cwd(), 'modules/*/'), process.cwd().replace(new RegExp(/\\/g), '/'))
};